# Use official MySQL image
FROM mysql:8

# Set environment variables (use a .env file for security)
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=scam_reports

# Copy database script into the container
COPY database.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
