# Use Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/jobliers-api/package*.json ./  
# Ensure the path is correct

# Install dependencies
RUN npm install

# Copy all backend files into the container
COPY backend/jobliers-api/ ./  
# Ensure the path is correct

# Expose the backend server port
EXPOSE 3000  
# Adjust this port if necessary

# Start the backend server
CMD ["node", "server.js"]
