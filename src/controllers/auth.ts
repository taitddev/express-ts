import express, { Request, Response } from "express";
import UserModel from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = { email, password };
    return res.status(200).json(user).end();
  } catch (error) {}
};
