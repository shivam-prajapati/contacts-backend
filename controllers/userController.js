const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    console.log(`User already `);
    throw new Error("user Already Registered");
  }
  const hashedPass = await bcrypt.hash(password, 10);
  // console.log(`Hashed Pass ${hashedPass}`)

  const user = await User.create({
    username,
    email,
    password: hashedPass,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not Valid");
  }
  // res.json({message: "Register the user"});
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are Necessary");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.status(200).json({accessToken})
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid")
  }
//   res.json({ message: "login the user" });
});


const currentUser = asyncHandler(async (req, res) => {
    console.log(`inside Current user in userctrl`)
  res.status(200).json(req.user );
});

module.exports = { registerUser, loginUser, currentUser };
