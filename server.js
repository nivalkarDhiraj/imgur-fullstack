const express = require("express");
require("dotenv").config();
const morgan = require("morgan"); //logger
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;
const mongodbURI = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0.nswef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// const postRoutes = require("./api/routes/posts");
// const userRoutes = require("./api/routes/user");

// mongoose

mongoose.connect(mongodbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => {
	console.log("Database Connected...");
});
mongoose.connection.on("error", (error) => {
	console.log("Error connecting database..."), error;
});


//cors
const whitelist = ['http://localhost:4000', 'http://localhost:8080', 'https://imgur-be.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//routes

app.use(require("./api/routes/auth")); //update later
app.use(require("./api/routes/post"));
// app.use("/posts", postRoutes);
// app.use("/user", userRoutes);
app.get("/", (req, res) => res.send("Hello World!!!"));

app.use((req, res, next) => {
	const error = new Error("route not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});


if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
  }

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
