FROM php:7.2-apache
RUN apt-get update -y

RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN a2enmod rewrite && service apache2 restart

# Install and enable xdebug.
#RUN pecl install xdebug && docker-php-ext-enable xdebug

WORKDIR /var/www/html

EXPOSE 80 443