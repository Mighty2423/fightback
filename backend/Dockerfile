FROM node:18 
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . . 

# Ensure the container has access to environment variables
ENV NODE_ENV=production
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_NAME=${DB_NAME}

# Set correct working directory if needed
WORKDIR /app/jobliers-api  

EXPOSE 3000

CMD ["node", "server.js"]
