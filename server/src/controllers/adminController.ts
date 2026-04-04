import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { z } from "zod";
import { env } from "../config/env";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../types/api";
import { LoginResponseData } from "../types/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginAdmin = asyncHandler(async (req: Request, res: Response<ApiResponse<LoginResponseData>>) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid credentials payload"
    });
    return;
  }

  const { email, password } = parsed.data;
  const admin = await User.findOne({ email }).exec();

  if (!admin) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
    return;
  }

  const token = jwt.sign({ email: admin.email }, env.JWT_SECRET, {
    subject: String(admin._id),
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      admin: {
        id: String(admin._id),
        email: admin.email
      }
    }
  });
});
