# pdf
This repository contains a full-stack web application developed using React for the frontend and Node.js for the backend. The application allows users to upload their resumes (in PDF format) along with their name, email, and a brief description of themselves. The backend API handles the file upload process, stores the resumes in the server's file system, and serves them upon request. The frontend provides a user-friendly interface for interacting with the application, allowing users to submit their details and view their uploaded resumes.

**Backend (Node.js):**

The Node.js backend is built using Express.js and provides the API endpoints necessary for file uploads and serving static files. It utilizes middleware such as multer for handling file uploads, cors for enabling cross-origin requests, and body-parser for parsing request bodies. The backend serves static files from the 'uploads' directory, where the uploaded resumes are stored. Additionally, it serves the React frontend as static files from the 'build' directory, enabling seamless integration between the frontend and backend components.

**Frontend (React):**

The React frontend offers a modern and intuitive user interface for interacting with the application. It consists of multiple components that facilitate the user journey, including a form for submitting user details and uploading resumes. The frontend communicates with the backend API to handle file uploads and retrieve uploaded resumes. It is built using popular React libraries such as axios for making HTTP requests and react-toastify for displaying notification messages.

**Docker Configuration:**

This repository includes Docker configuration files (Dockerfile and docker-compose.yml) to simplify the deployment process using Docker. The Dockerfile defines the steps for building the Docker image, including installing dependencies, copying source code, and exposing the necessary ports. The docker-compose.yml file orchestrates the deployment of the frontend and backend components, allowing them to communicate with each other seamlessly within the Docker network. Users can leverage Docker Compose to build and run the application in any environment that supports Docker, ensuring consistency and ease of deployment

**Steps to Run the Application:**
**1. Clone the Repository:**
```
git clone <repository_url>
```
**2. Navigate to the Project Directory:**
```
cd <project_directory>
```
**3. Create Environment Variables File:**
Create a file named .env in the project root directory and add the following content:
``` PORT=4000
```
**4. Build and Run the Docker Containers:**
Run the following command to build the Docker images and start the containers:
```
docker-compose up --build
```
This command will build the Docker images for the frontend and backend, create containers from these images, and start the application.
**5. Access the Application:**
Once the Docker containers are up and running, you can access the application in your web browser:

Open http://localhost:4000
Frontend Application: Open http://localhost:3000 to access the React frontend application.

**6. Interact with the Application:**

Use the frontend interface to submit user details and upload resumes.
Verify that the files are successfully uploaded by checking the uploads directory in the project root.
Backend API: Open http://localhost:4000/api/upload to access the backend API for file uploads.
**7. Stop the Docker Containers:**
To stop the Docker containers and remove the associated resources, press Ctrl + C in the terminal where docker-compose is running. Alternatively, run the following command in a separate terminal window:
```
docker-compose down
```
**8. Cleanup (Optional):**
If you want to remove all Docker resources related to the application, including images and volumes, you can run the following command:
```
docker-compose down --rmi all --volumes
```
These steps will allow anyone to easily build and run the application on their local machine using Docker Compose. Make sure Docker is installed and running on your system before executing these commands.

