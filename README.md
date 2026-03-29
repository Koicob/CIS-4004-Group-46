a. To first enter our directory, open a terminal and navigate to the CIS-4004-Group-46 folder. Then, to start the Express.js back-end server:
- Navigate into the server folder ( cd server).

- Run npm install to download all required dependencies (Mongoose, Express, Multer, and jsonwebtoken).

- Ensure you have a local instance of MongoDB running.

- Run the command node server.js to start the server. You should see "MongoDB Connected" and "Server running on port 8080" in the console.

b. The React front-end requires its own Vite development server. Open a second, separate terminal window and navigate to the front-end directory (e.g., cd client/knight-swap).

- Run npm install to download the front-end dependencies (react-router-dom, bootstrap, and jwt-decode).

- Run the command npm run dev to start the React application.

c. The Web Application (Front-End): Navigate to http://localhost:5173 in your web browser.

The API (Back-End): The Express server runs on http://localhost:8080.

d. The MongoDB database should be named knightSwap. Inside, Mongoose will automatically generate the following 5 collections based on our data model:
users

items

offers

locations

tags

Before running the app, please make sure to seed the database by opening your browser and visiting http://localhost:8080/seedData. This will instantly populate the locations and tags collections with standard campus data so the application may be used correctly.
