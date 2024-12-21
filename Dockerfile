# Use a Node.js base image with npm pre-installed
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will listen on
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]