import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import generateToken from '../utils/generateToken';
import { AuthRequest } from '../middleware/auth.middleware';
import mongoose from "mongoose";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({
    name,
    email,
    password,
  });

  const createdUser = await user.save();

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const uploadUserFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded: ${req.file.filename}`);
};

export const checkToken = (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.json({ valid: false });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, { ignoreExpiration: true }) as any;
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newToken = generateToken(user._id);
    res.json({ token: newToken, user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
