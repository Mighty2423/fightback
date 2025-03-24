FROM node:18

# Set the working directory for the application inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application files into the container
COPY ./jobliers-api/ ./jobliers-api/

# Set environment variables
ENV NODE_ENV=production
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_NAME=${DB_NAME}

# Expose port 3000 for the application
EXPOSE 3000

# Run the application
CMD ["node", "jobliers-api/server.js"]
