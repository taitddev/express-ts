import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User";
import { generateUsername } from "../helpers";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, dateOfBirth, gender } =
      req.body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required field" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const username = generateUsername(firstName, lastName);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });

    // Check user is already registered
    const findByEmailUser = await Promise.resolve(UserModel.findOne({ email }));
    if (findByEmailUser)
      return res.status(400).json({ message: "User already exists" });
    // Create new user
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required field" });
    }

    const user = await Promise.resolve(
      UserModel.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      })
    );

    if (!user) {
      return res.status(404).json("User not found");
    }

    const validity = await bcrypt.compare(password, user.password);

    if (!validity) {
      res.status(403).json("Wrong password");
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
