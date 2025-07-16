#!/bin/bash

# Database Recovery Script
# Veri kaybı durumunda backup'tan geri yükleme

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="mes_production"
DB_USER="mes_user"
BACKUP_DIR="/var/lib/postgresql/backup"

log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error_exit() {
    log "${RED}ERROR: $1${NC}"
    exit 1
}

success() {
    log "${GREEN}✅ $1${NC}"
}

warning() {
    log "${YELLOW}⚠️  $1${NC}"
}

# Check if backup directory exists
if [[ ! -d "$BACKUP_DIR" ]]; then
    error_exit "Backup directory not found: $BACKUP_DIR"
fi

# List available backups
echo "Available backups:"
ls -la "$BACKUP_DIR"/mes_backup_*.sql.gz 2>/dev/null || error_exit "No backups found"

# If backup file not specified, use the latest
if [[ -z "$1" ]]; then
    BACKUP_FILE=$(ls -t "$BACKUP_DIR"/mes_backup_*.sql.gz | head -1)
    warning "No backup file specified, using latest: $(basename $BACKUP_FILE)"
else
    BACKUP_FILE="$BACKUP_DIR/$1"
    if [[ ! -f "$BACKUP_FILE" ]]; then
        error_exit "Backup file not found: $BACKUP_FILE"
    fi
fi

log "Using backup file: $(basename $BACKUP_FILE)"

# Confirmation
echo ""
warning "⚠️  WARNING: This will REPLACE the current database!"
warning "⚠️  All current data will be LOST!"
echo ""
read -p "Are you sure you want to continue? (type 'YES' to confirm): " confirmation

if [[ "$confirmation" != "YES" ]]; then
    log "Recovery cancelled by user"
    exit 0
fi

# Stop application services to prevent data corruption
log "Stopping application services..."
docker stop mes-frontend mes-backend 2>/dev/null || warning "Services may already be stopped"

# Create a backup of current database before restore
log "Creating emergency backup of current database..."
EMERGENCY_BACKUP="$BACKUP_DIR/emergency_backup_$(date +%Y%m%d_%H%M%S).sql"
docker exec mes-database pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
    --format=custom --file="/tmp/emergency.sql" || warning "Emergency backup failed"

if docker exec mes-database test -f "/tmp/emergency.sql"; then
    docker cp mes-database:/tmp/emergency.sql "$EMERGENCY_BACKUP"
    gzip "$EMERGENCY_BACKUP"
    success "Emergency backup created: $(basename $EMERGENCY_BACKUP).gz"
fi

# Decompress backup if needed
RESTORE_FILE="$BACKUP_FILE"
if [[ "$BACKUP_FILE" == *.gz ]]; then
    log "Decompressing backup file..."
    RESTORE_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$RESTORE_FILE"
fi

# Copy backup file to container
log "Copying backup file to database container..."
docker cp "$RESTORE_FILE" mes-database:/tmp/restore.sql

# Drop and recreate database
log "Dropping and recreating database..."
docker exec mes-database psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c \
    "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='$DB_NAME';" || true

docker exec mes-database dropdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" || true
docker exec mes-database createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"

# Restore database
log "Restoring database from backup..."
if docker exec mes-database pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" \
    -d "$DB_NAME" --verbose --clean --no-owner --no-privileges /tmp/restore.sql; then
    success "Database restored successfully"
else
    error_exit "Database restore failed"
fi

# Clean up temporary files
docker exec mes-database rm -f /tmp/restore.sql /tmp/emergency.sql
if [[ "$RESTORE_FILE" != "$BACKUP_FILE" ]]; then
    rm -f "$RESTORE_FILE"
fi

# Restart application services
log "Restarting application services..."
docker start mes-backend mes-frontend

# Wait for services to be ready
log "Waiting for services to be ready..."
sleep 30

# Health checks
if docker exec mes-database pg_isready -U "$DB_USER" -d "$DB_NAME"; then
    success "Database is ready"
else
    error_exit "Database health check failed after restore"
fi

if curl -f http://localhost:3001/api/working-hours >/dev/null 2>&1; then
    success "Backend is ready"
else
    warning "Backend health check failed, may need more time"
fi

if curl -f http://localhost/ >/dev/null 2>&1; then
    success "Frontend is ready"
else
    warning "Frontend health check failed, may need more time"
fi

echo ""
success "🎉 Database recovery completed successfully!"
log "Restored from: $(basename $BACKUP_FILE)"
log "Emergency backup: $(basename $EMERGENCY_BACKUP).gz"
echo ""
log "Please verify your data and application functionality."
