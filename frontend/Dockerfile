# Use an official Nginx image for serving static content
FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy frontend files (HTML, CSS, JS, etc.) into Nginx public directory
COPY ./index.html .
COPY ./css ./css
COPY ./js ./js

# Expose port 80 for serving the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
