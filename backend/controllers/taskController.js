import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { validationResult } from 'express-validator';

export const createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, project, assignedTo, priority, dueDate, startDate, estimatedHours } = req.body;

        // Verify project exists and user has access
        const projectDoc = await Project.findById(project);
        if (!projectDoc) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const isOwner = projectDoc.owner.toString() === req.user.id;
        const isMember = projectDoc.members.some(m => m.user.toString() === req.user.id);

        if (!isOwner && !isMember && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const task = new Task({
            title,
            description,
            project,
            assignedTo: assignedTo || [],
            createdBy: req.user.id,
            priority,
            dueDate,
            startDate,
            estimatedHours
        });

        await task.save();
        await task.populate('project', 'name');
        await task.populate('assignedTo', 'name email avatar');
        await task.populate('createdBy', 'name email');

        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { projectId, status, priority, assignedTo } = req.query;

        let filter = {};

        if (projectId) {
            filter.project = projectId;
        }

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        if (assignedTo) {
            filter.assignedTo = assignedTo;
        }

        const tasks = await Task.find(filter);

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const project = await Project.findById(task.project);
        const isCreator = task.createdBy.toString() === req.user.id;
        const isOwner = project.owner.toString() === req.user.id;
        const isMember = project.members.some(m => m.user.toString() === req.user.id);

        if (!isCreator && !isOwner && !isMember && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { title, description, status, priority, dueDate, startDate, assignedTo, estimatedHours, actualHours } = req.body;

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (priority) task.priority = priority;
        if (dueDate) task.dueDate = dueDate;
        if (startDate) task.startDate = startDate;
        if (assignedTo) task.assignedTo = assignedTo;
        if (estimatedHours) task.estimatedHours = estimatedHours;
        if (actualHours) task.actualHours = actualHours;

        await task.save();
        await task.populate('project', 'name');
        await task.populate('assignedTo', 'name email avatar');
        await task.populate('createdBy', 'name email');

        res.json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const project = await Project.findById(task.project);
        const isCreator = task.createdBy.toString() === req.user.id;
        const isOwner = project.owner.toString() === req.user.id;

        if (!isCreator && !isOwner && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Task.findByIdAndDelete(req.params.taskId);

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.comments.push({
            user: req.user.id,
            text
        });

        await task.save();
        await task.populate('comments.user', 'name avatar');

        res.json({
            message: 'Comment added successfully',
            task
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskStats = async (req, res) => {
    try {
        const { projectId } = req.query;

        let filter = {};
        if (projectId) {
            filter.project = projectId;
        }

        const tasks = await Task.find(filter);

        const stats = {
            total: tasks.length,
            byStatus: {
                'To Do': tasks.filter(t => t.status === 'To Do').length,
                'In Progress': tasks.filter(t => t.status === 'In Progress').length,
                'In Review': tasks.filter(t => t.status === 'In Review').length,
                'Done': tasks.filter(t => t.status === 'Done').length
            },
            byPriority: {
                'Low': tasks.filter(t => t.priority === 'Low').length,
                'Medium': tasks.filter(t => t.priority === 'Medium').length,
                'High': tasks.filter(t => t.priority === 'High').length,
                'Critical': tasks.filter(t => t.priority === 'Critical').length
            },
            overdue: tasks.filter(t => t.isOverdue).length,
            overdueTasks: tasks.filter(t => t.isOverdue).map(t => ({
                id: t._id,
                title: t.title,
                dueDate: t.dueDate
            }))
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
