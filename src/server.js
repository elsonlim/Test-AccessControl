const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./tsRouter");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Up!");
});

app.post("/login", (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res
      .status(400)
      .json({ message: "Role is required in the request body" });
  }

  res.cookie("user", JSON.stringify({ role }), {
    httpOnly: true,
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({ message: "Logged in and cookie set", role });
});

const extractUserFromCookie = (req, res, next) => {
  const userCookie = req.cookies.user;

  if (userCookie) {
    try {
      req.user = JSON.parse(userCookie); // Parse the cookie value
    } catch (err) {
      return res.status(400).json({ message: "Invalid cookie format" });
    }
  } else {
    req.user = null; // Set user to null if cookie is missing
  }

  next();
};

app.use(extractUserFromCookie);

app.use("/ts", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!",
  });
});

module.exports = app;
