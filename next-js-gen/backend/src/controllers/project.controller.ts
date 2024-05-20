import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Project, { IProject } from '../models/project.model';
import {AuthRequest} from "../middleware/auth.middleware";

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!req.user) {
    return res.status(401).send({ message: 'Access denied. No user information.' });
  }

  const newProject: IProject = new Project({
    name,
    owner: new mongoose.Types.ObjectId(req.user._id.toString()),
    components: [],
  });

  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectsByUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Access denied. No user information.' });
  }

  try {
    const projects = await Project.find({ owner: req.user._id.toString() }).select('-components');
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Access denied. No user information.' });
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Permission denied. You are not the owner of this project.' });
    }

    Object.assign(project, req.body);
    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Access denied. No user information.' });
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.sub) {
      return res.status(403).json({ message: 'Permission denied. You are not the owner of this project.' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

