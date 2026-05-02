import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const checkProjectAccess = async (req, res, next) => {
    try {
        const projectId = req.params.projectId || req.body.project;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user is owner or member
        const isOwner = project.owner.toString() === req.user.id;
        const isMember = project.members.some(m => m.user.toString() === req.user.id);

        if (!isOwner && !isMember && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.project = project;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkTaskAccess = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const project = await Project.findById(task.project);
        const isOwner = project.owner.toString() === req.user.id;
        const isMember = project.members.some(m => m.user.toString() === req.user.id);

        if (!isOwner && !isMember && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.task = task;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
