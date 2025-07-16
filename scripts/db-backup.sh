#!/bin/bash

# PostgreSQL Automatic Backup Script
# Güncelleme öncesi otomatik backup alır

set -e

# Configuration
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="mes_production"
DB_USER="mes_user"
BACKUP_DIR="/var/lib/postgresql/backup"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="mes_backup_${TIMESTAMP}.sql"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Create backup directory if not exists
mkdir -p "$BACKUP_DIR"

log "Starting database backup..."

# Create backup
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
    --verbose --clean --no-owner --no-privileges \
    --format=custom --file="$BACKUP_PATH"

if [ $? -eq 0 ]; then
    log "Backup created successfully: $BACKUP_FILE"
    
    # Compress backup
    gzip "$BACKUP_PATH"
    log "Backup compressed: ${BACKUP_FILE}.gz"
    
    # Keep only last 7 backups
    cd "$BACKUP_DIR"
    ls -t mes_backup_*.sql.gz | tail -n +8 | xargs -r rm
    log "Old backups cleaned up"
    
    # Calculate backup size
    BACKUP_SIZE=$(du -h "${BACKUP_PATH}.gz" | cut -f1)
    log "Backup size: $BACKUP_SIZE"
    
    echo "SUCCESS: Database backup completed successfully"
else
    log "ERROR: Backup failed"
    exit 1
fi
