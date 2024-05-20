import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProjectsByUser,
  getProjectById,
  updateProject,
  deleteProject,
  } from '../controllers/project.controller';
import { protect } from "../middleware/auth.middleware";

const router: Router = Router();

router.use(protect);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/user', getProjectsByUser);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
