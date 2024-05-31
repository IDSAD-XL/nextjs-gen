import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Project, { IProject } from '../models/project.model';
import {AuthRequest} from "../middleware/auth.middleware";
import path from "path";
import fs from 'fs-extra';
import { exec } from 'child_process';
import archiver from 'archiver';
import {spawn} from "node:child_process";
import {gzip} from "node:zlib";

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


const boilerplatePath = path.join(__dirname, '../../../next-boilerplate');
const userGenPath = path.join(__dirname, '../../user-gen');

export const generateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const projectPath = path.join(userGenPath, projectId);

    if (fs.existsSync(projectPath)) {
      await fs.remove(projectPath);
    }

    await fs.copy(boilerplatePath, projectPath);

    const projectData = {
      name: project.name,
      owner: project.owner,
      components: project.components,
    };
    await fs.writeJson(path.join(projectPath, 'project.json'), projectData);

    exec(`cd ${projectPath} && npm install && npm run build`, async (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return res.status(500).json({ message: 'Error building project', error: err });
      }

      const output = fs.createWriteStream(path.join(userGenPath, `${projectId}.zip`));
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      output.on('close', () => {
        res.download(path.join(userGenPath, `${projectId}.zip`), `${projectId}.zip`, (err) => {
          if (err) {
            next(err);
          } else {
            fs.remove(path.join(userGenPath, `${projectId}.zip`));
            fs.remove(projectPath);
          }
        });
      });

      archive.on('error', (err) => {
        throw err;
      });

      archive.pipe(output);
      archive.directory(path.join(projectPath, 'out'), false);
      await archive.finalize();
    });
  } catch (error) {
    next(error);
  }
};

