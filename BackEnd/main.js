require("dotenv").config();

// Import dependencies
const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const DButils = require("./routes/utils/DButils");

const app = express();
const port = process.env.PORT || "80";

// Express middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../FrontEnd-master/dist")));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Session configuration
app.use(
  session({
    key: ["ID"],
    secret: "templateasdasdasdas",
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
  })
);

// CORS configuration
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// Routes for serving static files
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Middleware to handle user sessions
app.use(async (req, _, next) => {
  // if (req.session && req.session.user_id) {
  //   try {
  //     const users = await DButils.execQuery("SELECT user_id FROM USERS");
  //     if (users.find((user) => user.user_id === req.session.user_id)) {
  //       req.user_id = req.session.user_id;
  //     }
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
  req.session.user_id=1
  next();
});

// Health check route
app.get("/alive", ( _, res) => res.send("I'm alive"));

// Route handlers
const user = require("./routes/user");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");

app.use("/users", user);
app.use("/recipes", recipes);
app.use(auth);


// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message, success: false });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  if (server) {
    server.close(() => console.log("Server closed"));
  }
  process.exit();
});

module.exports = app;
