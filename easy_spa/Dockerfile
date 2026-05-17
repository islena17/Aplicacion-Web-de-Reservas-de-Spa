# === COMPILAR FRONTEND (React + Vite + TS) ===
FROM node:20 AS frontend-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# === CONFIGURAR SERVIDOR DE PRODUCCIÓN (PHP + Apache) ===
FROM php:8.2-apache

# 1. Instalar las extensiones de PHP indispensables para Laravel y bases de datos
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# 2. Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# 3. Cambiar el "DocumentRoot" de Apache para que apunte a /public de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Traer Composer oficial al contenedor
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Copiar los archivos del proyecto al servidor
WORKDIR /var/www/html
COPY . .

# 6. Mover los archivos de React ya compilados por Vite en la Etapa 1
COPY --from=frontend-stage /app/public /var/www/html/public

# 7. Instalar dependencias de producción de Laravel
RUN composer install --no-dev --optimize-autoloader

# 8. Asignar los permisos correctos para que Apache pueda escribir en la caché y el storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Puerto por defecto que usa Render
EXPOSE 80

CMD ["apache2-foreground"]
