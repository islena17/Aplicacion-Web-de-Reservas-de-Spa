# === COMPILAR FRONTEND (React + Vite + TS) ===
FROM php:8.2-cli AS frontend-stage

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    nodejs \
    npm

WORKDIR /app

COPY package*.json ./
COPY composer*.json ./

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install --no-dev --optimize-autoloader --no-scripts
RUN npm ci

COPY . .

RUN npm run build


# === CONFIGURAR SERVIDOR DE PRODUCCIÓN (PHP + Apache) ===
FROM php:8.2-apache

ENV COMPOSER_ALLOW_SUPERUSER=1

# Modificado: Añadimos libpq-dev (necesario para Postgres) junto a las demás librerías
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    # Modificado: Añadimos pdo_pgsql y pgsql al instalador de extensiones de PHP
    && docker-php-ext-install gd pdo pdo_mysql pdo_pgsql pgsql

RUN rm -f /etc/apache2/mods-enabled/mpm_* \
    && a2enmod mpm_prefork rewrite

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

COPY --from=frontend-stage /app/public/build /var/www/html/public/build

RUN composer install --no-dev --optimize-autoloader

RUN php artisan storage:link || true

RUN chown -R www-data:www-data /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/www/html/public/storage

EXPOSE 80

CMD ["apache2-foreground"]
