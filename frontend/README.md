# Frontend Setup Guide

## Prerequisites

- Node.js v14+
- npm or yarn

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

3. **Configure API URL in `.env`:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## Running the App

### Development Mode

```bash
npm run dev
```

The app will start on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── TaskCard.jsx
│   └── ProjectCard.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   └── Tasks.jsx
├── services/           # API service
│   └── api.js
├── context/            # Auth context
│   └── AuthContext.jsx
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Features

### Authentication

- Signup with email/password
- Login functionality
- JWT token management
- Protected routes

### Dashboard

- Task statistics
- Project overview
- Overdue task alerts

### Projects

- Create projects
- View all projects
- Add team members
- Track project status

### Tasks

- Create tasks
- Assign to team members
- Track status/priority
- Add comments
- Filter by project/status

## State Management

Uses React Context API for:

- User authentication
- Login/logout
- Authorization checks

## API Integration

All API calls go through `/src/services/api.js`:

- Automatic JWT token injection
- Axios interceptors
- Error handling
- Request/response formatting

## Styling

- CSS modules
- Flexbox layout
- Responsive design
- Color scheme: Purple gradient theme

## Common Issues

### API Connection Failed

- Ensure backend is running on port 5000
- Check VITE_API_URL in .env
- Verify CORS is enabled in backend

### Build Errors

- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear npm cache: `npm cache clean --force`

### Port Already in Use

- Change port in vite.config.js
- Or kill process: `lsof -ti:3000 | xargs kill -9`

## Best Practices

1. Always check auth context before rendering protected components
2. Handle loading and error states
3. Use API service layer instead of direct axios calls
4. Keep components small and reusable
5. Store tokens securely (current: localStorage)

## Production Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting
3. Set proper environment variables
4. Update API_URL for production backend
5. Enable HTTPS

## Testing

Create test accounts:

- Email: test@example.com
- Password: password123

Test different user roles:

- First user becomes Admin of their projects
- Other users are Members by default
