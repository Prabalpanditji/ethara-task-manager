# Backend Setup Guide

## Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

3. **Configure your MongoDB connection in `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/project-manager
   JWT_SECRET=your-secret-key (change this in production!)
   PORT=5000
   ```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## Project Structure

- `server.js` - Main server file
- `config/db.js` - Database configuration
- `models/` - Mongoose schemas
- `controllers/` - Request handlers
- `routes/` - API endpoints
- `middleware/` - Custom middleware

## API Documentation

### Authentication

- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/profile` - Get current user profile
- **PUT** `/api/auth/profile` - Update profile

### Projects

- **POST** `/api/projects` - Create new project
- **GET** `/api/projects` - Get all user's projects
- **GET** `/api/projects/:id` - Get project details
- **PUT** `/api/projects/:id` - Update project
- **DELETE** `/api/projects/:id` - Delete project

### Tasks

- **POST** `/api/tasks` - Create new task
- **GET** `/api/tasks` - Get tasks with filters
- **PUT** `/api/tasks/:id` - Update task
- **DELETE** `/api/tasks/:id` - Delete task
- **POST** `/api/tasks/:id/comments` - Add comment

## Common Issues

### MongoDB Connection Failed

- Check your connection string
- Verify IP whitelist on MongoDB Atlas
- Ensure credentials are correct

### Port Already in Use

- Change PORT in .env
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Dependencies Issues

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Notes

- All timestamps are in UTC
- Passwords are auto-hashed on save
- Tokens expire after 7 days
- Role-based access control is enforced
