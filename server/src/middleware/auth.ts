import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { TokenPayload } from "../types/auth";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const verified = jwt.verify(token, env.JWT_SECRET);

    if (typeof verified === "string" || !verified.sub || typeof verified.email !== "string") {
      res.status(401).json({ success: false, message: "Invalid or expired token" });
      return;
    }

    const payload = verified as TokenPayload;
    req.user = {
      id: payload.sub,
      email: payload.email
    };

    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
