# Use official MySQL image
FROM mysql:8

# Set environment variables inside the container
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=scam_reports
ENV MYSQL_USER=dbuser
ENV MYSQL_PASSWORD=dbpassword

# Copy initial SQL script into container
COPY database.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306