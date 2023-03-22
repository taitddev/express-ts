import { Request, Response } from "express";
import UserModel from "../models/User";

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    let users = await Promise.resolve(UserModel.find().select("-password"));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
