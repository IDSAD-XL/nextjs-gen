import express from 'express';
import {
  getCurrentUser,
  getUserById,
  uploadUserFile,
  registerUser,
  checkToken,
  refreshToken, authUser
} from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/current', protect, getCurrentUser);
router.post('/upload', protect, upload.single('file'), uploadUserFile);
router.get('/:id', getUserById);
router.post('/check-token', checkToken);
router.post('/refresh-token', refreshToken);

export default router;
