#!/usr/bin/env bash
# Salir si hay un error
set -o errexit

# Instalar dependencias de PHP
composer install --no-dev --optimize-autoloader

# Ejecutar optimizaciones de Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Ejecutar migraciones (descomenta si usas base de datos)
# php artisan migrate --force
