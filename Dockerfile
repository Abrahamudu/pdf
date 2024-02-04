# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for the backend (Node.js)
RUN npm install

# Change directory to the frontend folder
WORKDIR /usr/src/app/frontend

# Copy frontend files
COPY ./frontend ./

# Install dependencies for the frontend (React)
RUN npm install

# Build the React app
RUN npm run build

# Change directory back to the root folder
WORKDIR /usr/src/app

# Copy all the files from the root folder to the working directory in the container
COPY . .

# Expose port 4000 for the backend (Node.js) server
EXPOSE 4000

# Command to run the server
CMD ["node", "index.js"]
