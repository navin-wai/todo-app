const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const app = express();

const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => console.log("connected to MongoDb"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`App listening of port ${PORT}`);
});
