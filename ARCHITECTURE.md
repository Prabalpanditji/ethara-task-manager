# 🏗️ Architecture & Development Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │  Components │  │    Pages     │  │  Auth Context   │    │
│  │             │  │              │  │                 │    │
│  │ Navbar     │  │ Dashboard    │  │ State Mgmt      │    │
│  │ TaskCard   │  │ Projects     │  │ JWT Tokens      │    │
│  │ ProjectCard│  │ Tasks        │  │ User Info       │    │
│  └─────────────┘  └──────────────┘  └─────────────────┘    │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          API Service Layer (Axios)                  │   │
│  │  - Automatic authentication                         │   │
│  │  - Error handling                                   │   │
│  │  - Request/Response interceptors                    │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    HTTP/REST API
                    (JSON over HTTP)
                            │
┌───────────────────────────┴─────────────────────────────────┐
│              Backend (Node.js + Express)                     │
│                                                               │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  Routes/Controllers        Services     │               │
│  │  ├─ Auth        │  ├─ User Auth        │               │
│  │  ├─ Projects    │  ├─ Project Mgmt     │               │
│  │  └─ Tasks       │  └─ Task Tracking    │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                               │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  Middleware      │  │  Validators      │               │
│  │  ├─ Auth        │  ├─ Input Validation│               │
│  │  ├─ Access Ctrl │  └─ Error Handling  │               │
│  │  └─ CORS        │                      │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                               │
│  ┌──────────────────────────────────────────┐             │
│  │  Database Layer (Mongoose ODM)           │             │
│  │  ├─ User Model                           │             │
│  │  ├─ Project Model                        │             │
│  │  └─ Task Model                           │             │
│  └──────────────────────────────────────────┘             │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    MongoDB Protocol
                            │
┌───────────────────────────┴─────────────────────────────────┐
│         MongoDB (Atlas Cloud / Local)                        │
│                                                               │
│  Collections:                                               │
│  ├─ users        (User documents)                          │
│  ├─ projects     (Project documents)                       │
│  └─ tasks        (Task documents)                          │
└───────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow

```
1. User fills signup/login form
   ↓
2. Frontend sends credentials to backend
   ↓
3. Backend validates input
   ↓
4. Backend checks/creates user in MongoDB
   ↓
5. Backend generates JWT token
   ↓
6. Frontend receives token & user data
   ↓
7. Frontend stores token in localStorage
   ↓
8. Token added to all subsequent API requests
```

### Project Creation Flow

```
1. User clicks "Create Project"
   ↓
2. Form opens with project details
   ↓
3. User submits form
   ↓
4. Frontend sends POST to /api/projects
   ↓
5. Backend middleware validates token
   ↓
6. Backend validates input data
   ↓
7. Backend creates project document in MongoDB
   ↓
8. Backend returns created project
   ↓
9. Frontend updates projects list
   ↓
10. User sees new project
```

## File Organization

### Backend Structure

```
backend/
├── models/              # Database schemas
│   ├── User.js         # User model with auth methods
│   ├── Project.js      # Project model with relationships
│   └── Task.js         # Task model with auto-populate
│
├── controllers/        # Request handlers
│   ├── authController.js    # Auth logic
│   ├── projectController.js # Project CRUD
│   └── taskController.js    # Task CRUD
│
├── routes/            # API endpoints
│   ├── authRoutes.js      # /api/auth
│   ├── projectRoutes.js   # /api/projects
│   └── taskRoutes.js      # /api/tasks
│
├── middleware/        # Custom middleware
│   ├── auth.js        # JWT validation
│   └── accessControl.js    # Permission checking
│
├── config/
│   └── db.js          # MongoDB connection
│
├── server.js          # Express app setup
└── package.json       # Dependencies
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── TaskCard.jsx     # Task display card
│   │   └── ProjectCard.jsx  # Project display card
│   │
│   ├── pages/         # Full page components
│   │   ├── Login.jsx        # Login page
│   │   ├── Signup.jsx       # Signup page
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Projects.jsx     # Projects list/create
│   │   └── Tasks.jsx        # Tasks list/create
│   │
│   ├── services/      # API integration
│   │   └── api.js     # Axios setup + API calls
│   │
│   ├── context/       # State management
│   │   └── AuthContext.jsx  # Authentication state
│   │
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
│
├── public/
│   └── index.html     # HTML template
│
└── package.json       # Dependencies
```

## Design Patterns

### 1. MVC Pattern (Backend)

- **Models**: Mongoose schemas define data structure
- **Views**: JSON responses sent to frontend
- **Controllers**: Handle business logic

### 2. Context API (Frontend)

- Global state for authentication
- Available to all components via hooks
- Prevents prop drilling

### 3. Service Pattern (Frontend)

- API service handles all HTTP requests
- Centralized error handling
- Easy to mock for testing

### 4. Middleware Chain (Backend)

- Request → Auth Check → Access Control → Controller
- Each middleware can reject or pass request

## Security Implementation

### 1. Password Security

```javascript
// Passwords are auto-hashed using bcryptjs
// Comparison done via bcrypt.compare()
// Never stored in plain text
```

### 2. JWT Tokens

```javascript
// Issued on successful login
// Expires after 7 days
// Required for protected endpoints
// Sent in Authorization header
```

### 3. Access Control

```javascript
// Role-based: Admin vs Member
// Resource-based: Owner/Creator permissions
// Project-based: Members can only access assigned projects
```

### 4. Input Validation

```javascript
// express-validator on all inputs
// Type checking
// SQL injection prevention
// XSS prevention via JSON
```

## Database Relationships

```
User
├── 1:N Projects (owner)
├── N:N Projects (members)
└── 1:N Tasks (createdBy, assignedTo)

Project
├── 1:1 User (owner)
├── N:N Users (members)
└── 1:N Tasks (project)

Task
├── N:1 Project
├── 1:1 User (createdBy)
├── N:N Users (assignedTo)
└── 1:N Comments
    └── N:1 User (commenter)
```

## API Response Format

All responses follow consistent format:

```javascript
// Success responses
{
  "message": "Operation successful",
  "data": { /* actual data */ },
  "user": { /* user info */ }
}

// Error responses
{
  "message": "Error description",
  "error": "error details"
}

// Validation errors
{
  "errors": [
    { "msg": "Description", "param": "field" }
  ]
}
```

## Performance Considerations

### Database Optimization

- Indexes on frequently queried fields
- Auto-population of relationships
- Lean queries where full documents not needed

### API Optimization

- Pagination for large datasets (future)
- Response compression via gzip
- Caching headers set appropriately

### Frontend Optimization

- Component lazy loading (future)
- API call caching
- Minimized re-renders

## Error Handling

### Backend Error Handling

1. Validation errors (400)
2. Authentication errors (401)
3. Authorization errors (403)
4. Not found errors (404)
5. Server errors (500)

### Frontend Error Handling

1. User-friendly error messages
2. Console logging for debugging
3. Graceful fallbacks
4. Loading states

## Development Workflow

### Adding a New Feature

1. **Backend**

   ```
   1. Create/update Model
   2. Create Controller function
   3. Create/update Route
   4. Test with Postman/curl
   ```

2. **Frontend**
   ```
   1. Create UI Component
   2. Create API service call
   3. Integrate in Page component
   4. Test in browser
   ```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-notifications

# Make changes
# Commit
git add .
git commit -m "feat: add notifications"

# Push
git push origin feature/add-notifications

# Create Pull Request
```

## Testing Checklist

### Authentication

- [x] Signup creates user
- [x] Login with correct credentials
- [x] Login fails with wrong credentials
- [x] Token expiration handling
- [x] Protected routes redirect to login

### Projects

- [x] Create project as user
- [x] View all user projects
- [x] Update project details
- [x] Delete project
- [x] Add members to project
- [x] Remove members from project

### Tasks

- [x] Create task in project
- [x] Filter tasks by status/priority
- [x] Update task status
- [x] Delete task
- [x] Add comments to task
- [x] View task statistics

### Permissions

- [x] Non-owners can't edit projects
- [x] Non-members can't access project
- [x] Admin can access all
- [x] Members can only access assigned tasks

## Deployment

### Backend Deployment

1. Set environment variables
2. Connect to production MongoDB
3. Set JWT_SECRET to strong random value
4. Set NODE_ENV=production
5. Deploy to hosting (Heroku, Railway, etc.)

### Frontend Deployment

1. Update API_URL to production backend
2. Run `npm run build`
3. Deploy dist folder to hosting (Vercel, Netlify)

## Monitoring & Logging

### Things to Monitor

- API response times
- Database query performance
- Authentication errors
- Authorization violations
- Task overdue percentage

### Logging Strategy

- Console logs for development
- File logs for production
- Error tracking service (Sentry, etc.)
- User activity logging

## Future Enhancements

1. WebSocket for real-time updates
2. File uploads for tasks
3. Advanced reporting
4. Email notifications
5. Team collaboration features
6. Mobile app
7. Dark mode
8. Multilingual support
9. Advanced search
10. Third-party integrations

## Best Practices

### Frontend

- Keep components small and focused
- Use Context for global state
- Handle loading/error states
- Validate user input
- Use semantic HTML

### Backend

- Keep controllers thin
- Separate business logic
- Validate all inputs
- Use environment variables
- Log important operations
- Handle errors gracefully

### General

- Write clean, readable code
- Add comments for complex logic
- Follow naming conventions
- DRY (Don't Repeat Yourself)
- SOLID principles
- Regular code reviews
