const app = require("./app");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

//handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("shutting down due to uncaught exception");
  process.exit(1);
});

// setting up config file (server ke port set)
dotenv.config({ path: "backend/config/config.env" });

// conect to database
connectDatabase();

//stting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server startd on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// handle unhandle promise rejection and close server

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
