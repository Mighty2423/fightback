FROM node:18

# Set the working directory for the application inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application files into the container
# Use Node.js official image
FROM node:20

# Set environment variables at runtime, not at build time
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY ./jobliers-api/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application
COPY ./jobliers-api/ ./

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
