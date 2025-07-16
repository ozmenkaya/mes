#!/bin/bash

# MES Database Backup Script
# Bu script database'i yedekler ve geri yükleme sağlar

set -e

# Renkli output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Database connection settings
DB_CONTAINER="mes-database"
DB_NAME="mes_production"
DB_USER="mes_user"
BACKUP_DIR="./database/backups"
DATE=$(date +"%Y%m%d_%H%M%S")

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup function
backup_database() {
    print_info "Database yedekleniyor..."
    
    BACKUP_FILE="$BACKUP_DIR/mes_backup_$DATE.sql"
    
    docker exec $DB_CONTAINER pg_dump -U $DB_USER -d $DB_NAME > $BACKUP_FILE
    
    if [ $? -eq 0 ]; then
        print_info "✅ Backup başarılı: $BACKUP_FILE"
        
        # Compress backup
        gzip $BACKUP_FILE
        print_info "📦 Backup sıkıştırıldı: $BACKUP_FILE.gz"
        
        # Keep only last 7 backups
        find $BACKUP_DIR -name "*.gz" -type f -mtime +7 -delete
        print_info "🧹 Eski backup'lar temizlendi (7 günden eski)"
    else
        print_error "❌ Backup başarısız!"
        exit 1
    fi
}

# Restore function
restore_database() {
    local backup_file=$1
    
    if [ -z "$backup_file" ]; then
        print_error "Backup dosyası belirtilmedi!"
        echo "Kullanım: $0 restore backup_dosyası.sql"
        exit 1
    fi
    
    if [ ! -f "$backup_file" ]; then
        print_error "Backup dosyası bulunamadı: $backup_file"
        exit 1
    fi
    
    print_warning "⚠️  Database geri yüklenecek. Mevcut veriler silinecek!"
    read -p "Devam etmek istiyor musunuz? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Database geri yükleniyor..."
        
        # If compressed, decompress first
        if [[ $backup_file == *.gz ]]; then
            gunzip -c $backup_file | docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME
        else
            docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME < $backup_file
        fi
        
        if [ $? -eq 0 ]; then
            print_info "✅ Database geri yükleme başarılı!"
        else
            print_error "❌ Database geri yükleme başarısız!"
            exit 1
        fi
    else
        print_info "İşlem iptal edildi."
    fi
}

# List backups function
list_backups() {
    print_info "Mevcut backup'lar:"
    ls -lh $BACKUP_DIR/*.gz 2>/dev/null || print_warning "Backup bulunamadı."
}

# Main script
case "$1" in
    "backup")
        backup_database
        ;;
    "restore")
        restore_database "$2"
        ;;
    "list")
        list_backups
        ;;
    *)
        echo "MES Database Backup Tool"
        echo "Kullanım:"
        echo "  $0 backup                    - Database'i yedekle"
        echo "  $0 restore backup_file.sql   - Database'i geri yükle"
        echo "  $0 list                      - Mevcut backup'ları listele"
        exit 1
        ;;
esac
