# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for the frontend (React)
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose port 3000 for the React development server
EXPOSE 3000

# Command to start the React development server
CMD ["npm", "start"]
