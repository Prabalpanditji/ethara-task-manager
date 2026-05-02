# 📋 Project Management Web App

A full-stack web application for managing projects, tasks, and team collaboration with role-based access control (Admin/Member).

## ✨ Key Features

### 🔐 Authentication & Authorization

- User signup and login with JWT authentication
- Role-based access control (Admin/Member)
- Secure password hashing with bcrypt
- Protected routes and endpoints

### 📁 Project Management

- Create and manage projects
- Add team members to projects
- Track project status and priority
- Project timeline management

### ✅ Task Management

- Create and assign tasks to team members
- Track task status (To Do, In Progress, In Review, Done)
- Set task priority (Low, Medium, High, Critical)
- Due date tracking with overdue detection
- Task comments for collaboration

### 📊 Dashboard

- Real-time task statistics
- Task status breakdown
- Overdue task alerts
- Project overview

### 👥 Team Management

- Add/remove team members from projects
- Role-based permissions (Admin/Member)
- User profiles

## 🏗️ Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **CORS** for cross-origin requests

### Frontend

- **React 18** with Vite
- **React Router** v6 for navigation
- **Axios** for API calls
- **Context API** for state management

## 📋 Project Structure

```
project-management-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── accessControl.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── *.css
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── *.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── README.md
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-manager?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Start the server:**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Or production mode
   npm start
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Projects

- `POST /api/projects` - Create project (protected)
- `GET /api/projects` - Get user's projects (protected)
- `GET /api/projects/:projectId` - Get specific project (protected)
- `PUT /api/projects/:projectId` - Update project (protected, owner/admin)
- `DELETE /api/projects/:projectId` - Delete project (protected, owner/admin)
- `POST /api/projects/:projectId/members` - Add member (protected, admin/owner)
- `DELETE /api/projects/:projectId/members/:userId` - Remove member (protected, owner/admin)

### Tasks

- `POST /api/tasks` - Create task (protected)
- `GET /api/tasks` - Get tasks with filters (protected)
- `GET /api/tasks/:taskId` - Get specific task (protected)
- `PUT /api/tasks/:taskId` - Update task (protected)
- `DELETE /api/tasks/:taskId` - Delete task (protected, creator/owner/admin)
- `POST /api/tasks/:taskId/comments` - Add comment (protected)
- `GET /api/tasks/stats/overview` - Get task statistics (protected)

## 🔐 Authentication Flow

1. User signs up with email and password
2. Password is hashed using bcrypt
3. User logs in with credentials
4. Server returns JWT token
5. Token is stored in localStorage
6. Token is sent with every API request in Authorization header
7. Server validates token before allowing access

## 👥 Role-Based Access Control

### Admin Role

- Create and manage all projects
- Delete any project
- Manage all tasks
- Add/remove team members
- View all data

### Member Role

- Create projects (becomes owner)
- Create tasks in assigned projects
- Update assigned tasks
- View assigned projects and tasks
- Add comments to tasks

## 💾 Database Models

### User Schema

```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (Admin/Member, default: Member),
  avatar: String (optional),
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Project Schema

```javascript
{
  name: String (required),
  description: String,
  owner: ObjectId (ref: User),
  members: [{
    user: ObjectId (ref: User),
    role: String (Admin/Member)
  }],
  status: String (Active/Completed/On Hold/Archived),
  startDate: Date,
  endDate: Date,
  priority: String (Low/Medium/High),
  timestamps: true
}
```

### Task Schema

```javascript
{
  title: String (required),
  description: String,
  project: ObjectId (ref: Project, required),
  assignedTo: [ObjectId] (ref: User),
  createdBy: ObjectId (ref: User, required),
  status: String (To Do/In Progress/In Review/Done),
  priority: String (Low/Medium/High/Critical),
  dueDate: Date,
  startDate: Date,
  estimatedHours: Number,
  actualHours: Number,
  isOverdue: Boolean,
  comments: [{
    user: ObjectId (ref: User),
    text: String,
    createdAt: Date
  }],
  timestamps: true
}
```

## 🧪 Testing the Application

### Test Account

You can create accounts with any email/password. Here's a sample:

- Email: `test@example.com`
- Password: `password123`

### Sample Workflow

1. Sign up with a new account
2. Create a project
3. Add tasks to the project
4. Invite other team members
5. Track progress on tasks
6. View dashboard for overview

## 🔧 Configuration

### Environment Variables

**Backend (.env)**

```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=development
```

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Build for Production

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run preview
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB Atlas IP whitelist includes your IP
- Check connection string is correct
- Verify username/password in connection string

### API Not Responding

- Check backend is running on port 5000
- Verify CORS is enabled in Express
- Check network tab in browser dev tools

### Token Expiration

- Tokens expire after 7 days
- User needs to login again
- Token is automatically deleted from localStorage

## 🚀 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] File attachments for tasks
- [ ] Task dependencies
- [ ] Gantt chart view
- [ ] Advanced reporting and analytics
- [ ] Email notifications
- [ ] Mobile app
- [ ] Integration with Slack/Teams
- [ ] Time tracking
- [ ] Sprint management

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@projectmanager.com or open an issue in the repository.

## 📝 Changelog

### Version 1.0.0

- Initial release
- Authentication system
- Project management
- Task management
- Dashboard
- Role-based access control
