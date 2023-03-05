const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser');

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config")

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// This is where we import the users routes function from our user.routes.js file
const userRoutes = require("./routes/user.routes");
userRoutes(app);
const postRoutes = require("./routes/post.routes");
postRoutes(app);
const likeRoutes = require("./routes/like.routes");
likeRoutes(app);
const commentRoutes = require("./routes/comment.routes");
commentRoutes(app);
const actionRoutes = require("./routes/action.routes");
actionRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
