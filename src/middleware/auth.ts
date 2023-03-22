import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IDecodedToken {
  exp: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    if (!token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Invalid authorization header format" });
    }

    const jwtToken = token.substring(7);
    const decodedToken = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET_KEY
    ) as IDecodedToken;

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { exp } = decodedToken;

    // Check if the token has expired
    if (Date.now() >= exp * 1000) {
      console.log("Token has expired");
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
