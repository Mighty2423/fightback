# Use Node.js official image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY ./jobliers-api/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY ./jobliers-api/ ./

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]

