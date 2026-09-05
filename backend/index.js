require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todo");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();

const PORT = process.env.PORT || 8000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to MongoDb"));

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`App listening of port ${PORT}`);
});
