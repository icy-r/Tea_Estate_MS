import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

export const userLogout = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
};

export const userRegister = async (req, res) => {
  const { email, password, companyName, companyAddress, companyPhone } =
    req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = new User({
    email,
    password,
    companyName,
    companyAddress,
    companyPhone,
  });
  await newUser.save();
  res.status(200).json({ message: "User created" });
};

export const userUpdate = async (req, res) => {
  const { email, password, companyName, companyAddress, companyPhone } =
    req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  user.companyName = companyName;
  user.companyAddress = companyAddress;
  user.companyPhone = companyPhone;
  await user.save();
  res.status(200).json({ message: "User updated" });
};

export const userDelete = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  await user.deleteOne();
  res.status(200).json({ message: "User deleted" });
};

export const userGet = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  res.status(200).json({ user });
};

export const userGetAll = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};
