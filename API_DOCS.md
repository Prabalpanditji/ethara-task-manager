# 📚 API Documentation

Base URL: `http://localhost:5000/api`

All protected endpoints require `Authorization: Bearer {token}` header.

## Authentication Endpoints

### 1. Sign Up

Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"password": "password123"
}
```

**Response (201):**

```json
{
	"message": "User created successfully",
	"token": "eyJhbGciOiJIUzI1NiIs...",
	"user": {
		"id": "507f1f77bcf86cd799439011",
		"name": "John Doe",
		"email": "john@example.com",
		"role": "Member"
	}
}
```

**Validation Rules:**

- Name: required, max 50 characters
- Email: valid email format, unique
- Password: min 6 characters

---

### 2. Login

Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
	"email": "john@example.com",
	"password": "password123"
}
```

**Response (200):**

```json
{
	"message": "Login successful",
	"token": "eyJhbGciOiJIUzI1NiIs...",
	"user": {
		"id": "507f1f77bcf86cd799439011",
		"name": "John Doe",
		"email": "john@example.com",
		"role": "Member",
		"avatar": null
	}
}
```

---

### 3. Get Profile

Get current user's profile information.

**Endpoint:** `GET /auth/profile`

**Headers:** Authorization required

**Response (200):**

```json
{
	"_id": "507f1f77bcf86cd799439011",
	"name": "John Doe",
	"email": "john@example.com",
	"role": "Member",
	"avatar": null,
	"isActive": true,
	"createdAt": "2024-05-01T10:00:00Z",
	"updatedAt": "2024-05-01T10:00:00Z"
}
```

---

### 4. Update Profile

Update current user's profile.

**Endpoint:** `PUT /auth/profile`

**Headers:** Authorization required

**Request Body:**

```json
{
	"name": "Jane Doe",
	"avatar": "https://example.com/avatar.jpg"
}
```

**Response (200):**

```json
{
	"message": "Profile updated successfully",
	"user": {
		"_id": "507f1f77bcf86cd799439011",
		"name": "Jane Doe",
		"email": "john@example.com",
		"role": "Member",
		"avatar": "https://example.com/avatar.jpg"
	}
}
```

---

## Project Endpoints

### 1. Create Project

Create a new project.

**Endpoint:** `POST /projects`

**Headers:** Authorization required

**Request Body:**

```json
{
	"name": "Mobile App Development",
	"description": "Build iOS and Android app",
	"startDate": "2024-05-01",
	"endDate": "2024-08-01",
	"priority": "High"
}
```

**Response (201):**

```json
{
	"message": "Project created successfully",
	"project": {
		"_id": "507f1f77bcf86cd799439012",
		"name": "Mobile App Development",
		"description": "Build iOS and Android app",
		"owner": {
			"_id": "507f1f77bcf86cd799439011",
			"name": "John Doe",
			"email": "john@example.com"
		},
		"members": [
			{
				"user": "507f1f77bcf86cd799439011",
				"role": "Admin"
			}
		],
		"status": "Active",
		"priority": "High",
		"startDate": "2024-05-01",
		"endDate": "2024-08-01"
	}
}
```

---

### 2. Get All Projects

Get all projects where user is owner or member.

**Endpoint:** `GET /projects`

**Headers:** Authorization required

**Response (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Mobile App Development",
    "owner": { ... },
    "members": [ ... ],
    "status": "Active"
  }
]
```

---

### 3. Get Project by ID

Get specific project details.

**Endpoint:** `GET /projects/:projectId`

**Headers:** Authorization required

**Response (200):**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Mobile App Development",
  "description": "Build iOS and Android app",
  "owner": { ... },
  "members": [ ... ],
  "status": "Active",
  "priority": "High",
  "startDate": "2024-05-01",
  "endDate": "2024-08-01"
}
```

---

### 4. Update Project

Update project details.

**Endpoint:** `PUT /projects/:projectId`

**Headers:** Authorization required (Owner/Admin only)

**Request Body:**

```json
{
	"name": "Web App Development",
	"status": "In Progress",
	"priority": "Critical"
}
```

**Response (200):**

```json
{
  "message": "Project updated successfully",
  "project": { ... }
}
```

---

### 5. Delete Project

Delete project and all associated tasks.

**Endpoint:** `DELETE /projects/:projectId`

**Headers:** Authorization required (Owner/Admin only)

**Response (200):**

```json
{
	"message": "Project deleted successfully"
}
```

---

### 6. Add Member to Project

Add user as member to project.

**Endpoint:** `POST /projects/:projectId/members`

**Headers:** Authorization required (Admin/Owner only)

**Request Body:**

```json
{
	"userId": "507f1f77bcf86cd799439013"
}
```

**Response (200):**

```json
{
  "message": "Member added successfully",
  "project": { ... }
}
```

---

### 7. Remove Member from Project

Remove member from project.

**Endpoint:** `DELETE /projects/:projectId/members/:userId`

**Headers:** Authorization required (Owner/Admin only)

**Response (200):**

```json
{
  "message": "Member removed successfully",
  "project": { ... }
}
```

---

## Task Endpoints

### 1. Create Task

Create a new task.

**Endpoint:** `POST /tasks`

**Headers:** Authorization required

**Request Body:**

```json
{
	"title": "Design database schema",
	"description": "Create MongoDB schema for users",
	"project": "507f1f77bcf86cd799439012",
	"priority": "High",
	"dueDate": "2024-05-15",
	"startDate": "2024-05-01",
	"estimatedHours": 8,
	"assignedTo": ["507f1f77bcf86cd799439013"]
}
```

**Response (201):**

```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Design database schema",
    "description": "Create MongoDB schema for users",
    "project": { "_id": "507f1f77bcf86cd799439012", "name": "Mobile App" },
    "assignedTo": [ ... ],
    "createdBy": { ... },
    "status": "To Do",
    "priority": "High",
    "dueDate": "2024-05-15",
    "isOverdue": false,
    "comments": []
  }
}
```

---

### 2. Get Tasks with Filters

Get tasks with optional filtering.

**Endpoint:** `GET /tasks`

**Headers:** Authorization required

**Query Parameters:**

- `projectId` - Filter by project
- `status` - Filter by status (To Do, In Progress, In Review, Done)
- `priority` - Filter by priority (Low, Medium, High, Critical)
- `assignedTo` - Filter by assigned user

**Example:** `GET /tasks?projectId=507f1f77bcf86cd799439012&status=In Progress`

**Response (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Design database schema",
    "project": { ... },
    "status": "In Progress",
    "priority": "High"
  }
]
```

---

### 3. Get Task by ID

Get specific task details.

**Endpoint:** `GET /tasks/:taskId`

**Headers:** Authorization required

**Response (200):**

```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "Design database schema",
  "description": "Create MongoDB schema",
  "project": { ... },
  "assignedTo": [ ... ],
  "createdBy": { ... },
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2024-05-15",
  "startDate": "2024-05-01",
  "estimatedHours": 8,
  "actualHours": 5,
  "isOverdue": false,
  "comments": [ ... ]
}
```

---

### 4. Update Task

Update task details and status.

**Endpoint:** `PUT /tasks/:taskId`

**Headers:** Authorization required

**Request Body:**

```json
{
	"status": "In Review",
	"actualHours": 7,
	"priority": "Medium",
	"assignedTo": ["507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"]
}
```

**Response (200):**

```json
{
  "message": "Task updated successfully",
  "task": { ... }
}
```

---

### 5. Delete Task

Delete a task.

**Endpoint:** `DELETE /tasks/:taskId`

**Headers:** Authorization required (Creator/Owner/Admin only)

**Response (200):**

```json
{
	"message": "Task deleted successfully"
}
```

---

### 6. Add Comment to Task

Add a comment to a task.

**Endpoint:** `POST /tasks/:taskId/comments`

**Headers:** Authorization required

**Request Body:**

```json
{
	"text": "Starting work on this task now"
}
```

**Response (200):**

```json
{
	"message": "Comment added successfully",
	"task": {
		"_id": "507f1f77bcf86cd799439014",
		"comments": [
			{
				"user": { "_id": "507f1f77bcf86cd799439011", "name": "John Doe" },
				"text": "Starting work on this task now",
				"createdAt": "2024-05-01T14:30:00Z"
			}
		]
	}
}
```

---

### 7. Get Task Statistics

Get task statistics and overdue items.

**Endpoint:** `GET /tasks/stats/overview`

**Headers:** Authorization required

**Query Parameters:**

- `projectId` - Get stats for specific project (optional)

**Response (200):**

```json
{
	"total": 25,
	"byStatus": {
		"To Do": 10,
		"In Progress": 8,
		"In Review": 4,
		"Done": 3
	},
	"byPriority": {
		"Low": 5,
		"Medium": 12,
		"High": 6,
		"Critical": 2
	},
	"overdue": 2,
	"overdueTasks": [
		{
			"id": "507f1f77bcf86cd799439014",
			"title": "Design database schema",
			"dueDate": "2024-04-30T00:00:00Z"
		}
	]
}
```

---

## Error Responses

### 400 Bad Request

```json
{
	"errors": [
		{
			"msg": "Valid email is required",
			"param": "email"
		}
	]
}
```

### 401 Unauthorized

```json
{
	"message": "Access token required"
}
```

### 403 Forbidden

```json
{
	"message": "Access denied"
}
```

### 404 Not Found

```json
{
	"message": "Project not found"
}
```

### 500 Server Error

```json
{
	"message": "Server error",
	"error": "error details"
}
```

---

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Authentication

All protected endpoints require a Bearer token in Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token expires after 7 days. User needs to login again to get a new token.

---

## Rate Limiting

Currently not implemented. May be added in future versions.

---

## Versioning

API Version: `v1`

All endpoints use `/api` prefix.

---

## Testing

Use tools like:

- Postman
- curl
- Thunder Client
- VS Code REST Client

Example curl request:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```
