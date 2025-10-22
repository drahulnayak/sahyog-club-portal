# SAHYOG - The Mentorship Club Portal (NIT Raipur)

![NIT Raipur Logo](https://d2lk14jtvqry1q.cloudfront.net/media/large_National_Institute_of_Technology_Raipur_NIT_Raipur_7b96ea4177_d18e211c83.png)

## Overview

A full-stack MERN application serving as a central resource hub for students at NIT Raipur. This platform provides access to previous year question papers (PYQs), club event information, and fosters a supportive mentorship environment through the SAHYOG club initiative.

## Features

* **PYQ Archive:** Students can easily browse and access PYQs filtered by academic year, branch, and semester.
* **Events Section:** A dynamic blog-style page displaying recent club events and announcements, complete with images and descriptions. Logged-in users can "like" posts.
* **User Authentication:** Secure Sign Up and Login functionality using JWT (JSON Web Tokens).
* **Admin Panel:** A password-protected interface (`/admin`) for authorized users to:
    * Upload new PYQ links.
    * Upload new event posts with images (files are stored on the server).
* **Responsive Design:** Fully functional and visually appealing on desktops, tablets, and mobile devices.
* **About Us Page:** Detailed information about the SAHYOG club's mission, history, and faculty in-charges.
* **User Count Display:** Shows the total number of registered users.

## Tech Stack

**Frontend:**
* React (using Vite)
* React Router for navigation
* JavaScript (ES6+)
* CSS3 (with responsive design principles)
* Fetch API for backend communication

**Backend:**
* Node.js
* Express.js framework
* MongoDB (using Mongoose ODM) for the database
* JWT (jsonwebtoken) for authentication
* bcrypt.js for password hashing
* Multer for handling file uploads
* dotenv for environment variable management

**Database:**
* MongoDB Atlas (Cloud-hosted NoSQL database)

## Project Structure