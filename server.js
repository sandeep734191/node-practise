const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler=require("./middleware/error");
const connectDB = require("./config/db");
//route files
const bootCamps = require("./routes/bootcamps");

//middleware

const logger = require("./middleware/logger");

//load env variables
dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json())


//mount routers
app.use("/app/v1/bootcamps", bootCamps);

app.use(errorHandler)
//dev logging middleware
if (process.env.NODE_ENV === "development") {
  console.log("reached here");
  app.use(morgan("dev"));
}

// app.use(logger);

app.get("/test", (req, res) => {
  res.json({ message: "working" });
});

const server = app.listen(PORT, console.log("server started".yellow.bold));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
