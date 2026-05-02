import express from 'express';
import { body } from 'express-validator';
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addMember,
    removeMember
} from '../controllers/projectController.js';
import { authenticateToken, authorize } from '../middleware/auth.js';
import { checkProjectAccess } from '../middleware/accessControl.js';

const router = express.Router();

// Create project
router.post(
    '/',
    authenticateToken,
    [
        body('name').trim().notEmpty().withMessage('Project name is required'),
        body('description').optional().trim(),
        body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
    ],
    createProject
);

// Get all projects for user
router.get('/', authenticateToken, getProjects);

// Get single project
router.get('/:projectId', authenticateToken, checkProjectAccess, getProjectById);

// Update project
router.put(
    '/:projectId',
    authenticateToken,
    checkProjectAccess,
    updateProject
);

// Delete project
router.delete('/:projectId', authenticateToken, checkProjectAccess, deleteProject);

// Add member to project
router.post(
    '/:projectId/members',
    authenticateToken,
    checkProjectAccess,
    [body('userId').notEmpty().withMessage('User ID is required')],
    addMember
);

// Remove member from project
router.delete(
    '/:projectId/members/:userId',
    authenticateToken,
    checkProjectAccess,
    removeMember
);

export default router;
