import express from 'express';
import { body } from 'express-validator';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    addComment,
    getTaskStats
} from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkTaskAccess } from '../middleware/accessControl.js';

const router = express.Router();

// Create task
router.post(
    '/',
    authenticateToken,
    [
        body('title').trim().notEmpty().withMessage('Task title is required'),
        body('project').notEmpty().withMessage('Project ID is required'),
        body('priority').optional().isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Invalid priority'),
        body('status').optional().isIn(['To Do', 'In Progress', 'In Review', 'Done']).withMessage('Invalid status')
    ],
    createTask
);

// Get all tasks with filters
router.get('/', authenticateToken, getTasks);

// Get task stats
router.get('/stats/overview', authenticateToken, getTaskStats);

// Get single task
router.get('/:taskId', authenticateToken, checkTaskAccess, getTaskById);

// Update task
router.put(
    '/:taskId',
    authenticateToken,
    checkTaskAccess,
    updateTask
);

// Delete task
router.delete('/:taskId', authenticateToken, checkTaskAccess, deleteTask);

// Add comment to task
router.post(
    '/:taskId/comments',
    authenticateToken,
    [body('text').trim().notEmpty().withMessage('Comment text is required')],
    addComment
);

export default router;
