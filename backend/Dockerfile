# Use Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from jobliers-api
COPY backend/jobliers-api/package*.json ./  
# Ensure the path is correct

# Install dependencies
RUN npm install

# Copy all backend files from jobliers-api into the container
COPY backend/jobliers-api/ ./  
# Ensure the path is correct

# Expose the backend server port (adjust if necessary)
EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"]

