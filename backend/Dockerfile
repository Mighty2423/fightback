FROM node:18 

# Set the working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application files
COPY backend/ ./

# Ensure the container has access to environment variables (correctly passed from the Docker-compose environment)
ENV NODE_ENV=production
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_NAME=${DB_NAME}

# Set the working directory inside the container for the API
WORKDIR /app/jobliers-api 

# Expose port for the app to be accessible
EXPOSE 3000 

# Run the application using node
CMD ["node", "server.js"]