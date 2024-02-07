const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
mongoose.connect("mongodb://0.0.0.0:27017/blogapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!🛠`));
