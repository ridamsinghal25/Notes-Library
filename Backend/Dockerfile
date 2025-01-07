# Use Node.js version 14 as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to allow access to the application
EXPOSE 3000

# Set the default command to run the application
CMD ["node", "-r", "dotenv/config", "src/server.js"]
