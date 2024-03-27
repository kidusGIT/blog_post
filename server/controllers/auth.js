import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const getUserInfo = async (user) => {
  const username = await User.findOne({
    where: {
      username: user,
    },
  });
  return username;
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    return res.status(200).json({ status: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ status: false, message: "Something went wrong" });
  }
};

// create user
export const createUser = async (req, res) => {
  try {
    const username = req.body.username;
    const full_name = req.body.full_name;
    const password = req.body.password;

    if (
      username == null ||
      username == "" ||
      full_name == "" ||
      full_name == null ||
      password == "" ||
      password == null
    )
      return res.status(400).json({
        message: "Please fill all the fields, they are required",
        status: false,
      });

    const getUser = await getUserInfo(req.body.username);
    if (getUser)
      return res
        .status(400)
        .json({ message: "Username is taken", status: false });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      full_name: full_name,
      username: username,
      password: hashPassword,
    });

    await user.save();
    return res.status(200).json({ message: "User created", status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Some thing went wrong", status: false });
  }
};

// login user
export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "Username not found", status: false });

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd)
      return res
        .status(400)
        .json({ message: "Incorrect password", status: false });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT
    );

    return res
      .status(200)
      .json({ token: token, userId: user.id, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ message: "Some thing went wrong", status: false });
  }
};
