const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const accountRouter = require("./rotues/account.routes.js");
const authRouter = require("./rotues/auth.router.js");

app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

app.get("/test", (req, res) => {
  res.json({
    message: "Server is working",
  });
});

module.exports = app;
