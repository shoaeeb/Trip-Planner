require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const auth = require("./routes/auth");
const destinations = require("./routes/destinations");
const pages = require("./routes/pages");
//port

//error handler
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
//static assets
//bootstrap dependencies
app.use(express.static("./node_modules/bootstrap/dist"));
//add leaflet css and js
app.use(express.static("./node_modules/leaflet/dist"));

app.use(express.static("./public"));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/api/v1/auth", auth);
app.use("/api/v1/destinations", destinations);
//for login and register pages
app.use("/auth", pages);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    //connect to db
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
