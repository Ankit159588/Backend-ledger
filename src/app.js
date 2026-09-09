const express = require("express");
const authRouter = require("./rotues/auth.router.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/test", (req, res) => {
  res.json({
    message: "Server is working"
  });
});

module.exports = app;
