const express = require("express");
const router = express.Router();
const path = require("path");
const loginPage = path.resolve(__dirname, "../public/login.html");
const registerPage = path.resolve(__dirname, "../public/register.html");
router.get("/login", (req, res) => {
  res.sendFile(loginPage);
});

router.get("/register", (req, res) => {
  res.sendFile(registerPage);
});

module.exports = router;
