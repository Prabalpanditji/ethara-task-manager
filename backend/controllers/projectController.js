import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { validationResult } from 'express-validator';

export const createProject = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, startDate, endDate, priority } = req.body;

        const project = new Project({
            name,
            description,
            owner: req.user.id,
            members: [{ user: req.user.id, role: 'Admin' }],
            startDate,
            endDate,
            priority
        });

        await project.save();
        await project.populate('owner', 'name email avatar');
        await project.populate('members.user', 'name email avatar');

        res.status(201).json({
            message: 'Project created successfully',
            project
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { owner: req.user.id },
                { 'members.user': req.user.id }
            ]
        });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Only owner or admin can update
        if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { name, description, status, startDate, endDate, priority } = req.body;

        if (name) project.name = name;
        if (description) project.description = description;
        if (status) project.status = status;
        if (startDate) project.startDate = startDate;
        if (endDate) project.endDate = endDate;
        if (priority) project.priority = priority;

        await project.save();
        await project.populate('owner', 'name email avatar');
        await project.populate('members.user', 'name email avatar');

        res.json({
            message: 'Project updated successfully',
            project
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Only owner or admin can delete
        if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Delete all tasks associated with this project
        await Task.deleteMany({ project: req.params.projectId });

        await Project.findByIdAndDelete(req.params.projectId);

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Only owner or admin members can add members
        const isOwner = project.owner.toString() === req.user.id;
        const isAdmin = project.members.some(m => m.user.toString() === req.user.id && m.role === 'Admin');

        if (!isOwner && !isAdmin && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Check if member already exists
        if (project.members.some(m => m.user.toString() === userId)) {
            return res.status(400).json({ message: 'User is already a member' });
        }

        project.members.push({ user: userId, role: 'Member' });
        await project.save();
        await project.populate('members.user', 'name email avatar');

        res.json({
            message: 'Member added successfully',
            project
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeMember = async (req, res) => {
    try {
        const { userId } = req.params;
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Only owner can remove members
        if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        project.members = project.members.filter(m => m.user.toString() !== userId);
        await project.save();
        await project.populate('members.user', 'name email avatar');

        res.json({
            message: 'Member removed successfully',
            project
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
