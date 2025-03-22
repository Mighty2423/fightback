# Use official MySQL image
FROM mysql:8

# Allow passing environment variables at build time
ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD

# Set environment variables inside the container
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Copy database script into the container
COPY database.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
