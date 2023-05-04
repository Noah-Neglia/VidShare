# VidShare

VidShare is a responsive social media application that allows users to connect by sharing video content. The app is built entirely with the MERN stack (MongoDB, Express, React, Node.js).

## Screenshots

### Registration

![Register](https://user-images.githubusercontent.com/104607714/222873157-7264f0de-8ac2-469e-abe1-279dc75c2097.png)

### Dashboard

![dashboard](https://user-images.githubusercontent.com/104607714/222873212-495689e6-3752-4ab1-8158-6019e1fe5704.png)

### Comments

![Comments](https://user-images.githubusercontent.com/104607714/222873254-666bf974-6233-4c54-89a2-76611886172e.png)

### Responsive view for iPad Air

![Ipad](https://user-images.githubusercontent.com/104607714/222873272-a0c1dbc3-a2d1-457f-8827-02c557aaffd9.png)

## Installation and Setup

This project requires the installation of MongoDB prior to setup.

1. Clone or download this repository.

2. Navigate to both client and server folders and then enter `npm i`.

3. To launch the client, enter `npm start`.

4. To launch the server, enter `nodemon server.js`.

5. Type `localhost:3000` into your browser and you will visit the register page.

## Reflection

My purpose for creating VidShare was to get familiar with nested documents in MongoDB/Mongoose, and learn how to upload files using npm multer. Technologies that were applied to build this project include: React, Axios, React-Router-Dom, multer, JSON web tokens, Bootstrap, and B-Crypt.

How I used these technologies:

- Utilized React.js to produce many interconnected components for a social media dashboard.
- Implemented the Bootstrap library to quickly construct high quality forms.
- Designed a login and registration that employs JSON Web Tokens to store data in browser cookies that enables the application to verify authorized users.
- Employed the Mongoose library to accurately mimic one to many relationships in MongoDB.
- Used the node package module multer to seamlessly upload video files to a folder in the application to be displayed on the dashboard.
