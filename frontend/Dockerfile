# Use Node.js to build the frontend
FROM node:14 AS build

# Set the working directory to /app (root of your project)
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files into the container
COPY . .

# Build the frontend (production build)
RUN npm run build

# Use an official Nginx image for serving static content
FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy the built files from the build stage to Nginx's public directory
COPY --from=build /app/build/ .

# Expose port 80 for serving the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
