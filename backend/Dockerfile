# Use Alpine-based Node.js image (much smaller)
FROM node:14-alpine

# Set the working directory  
WORKDIR /usr/src/app 

# Copy package.json and package-lock.json  
COPY package*.json ./  

# Install only production dependencies  
RUN npm install --production

# Copy the rest of your application code  
COPY . .

# Copy environment variables
COPY .env .env

# Expose the port the app runs on  
EXPOSE 5000

# Command to run the application  
CMD ["node", "server.js"]  