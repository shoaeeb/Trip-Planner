//login
const { BadRequestError, UnauthenticatedError } = require("../errors");
const asyncWrapper = require("../middleware/error-async");
const User = require("../models/Users");
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  const isPasswordCorrect = await user.comparePasswords(password);

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const token = await user.createJWT();
  res
    .status(200)
    .json({ user: { name: user.name }, token, msg: "User Logged In" });
});
const register = asyncWrapper(async (req, res) => {
  const user = await User.create(req.body);
  const token = await user.createJWT();
  res.status(201).json({
    user: { name: user.name, email: user.email },
    token,
    msg: "User Created",
  });
});

module.exports = { login, register };
