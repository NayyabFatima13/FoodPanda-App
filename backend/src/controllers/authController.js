import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
} from "../models/user.js";

// ======================================
// REGISTER
// ======================================

export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser(
      name,
      email,
      hashedPassword
    );

    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// LOGIN
// ======================================

export const login = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Find user
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};