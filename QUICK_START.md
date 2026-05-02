# 🚀 Quick Start Guide

## One-Step Setup (Recommended)

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your MongoDB connection string
# Then start the server
npm run dev
```

**Expected output:**

```
MongoDB connected successfully
Server running on port 5000
```

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

**Expected output:**

```
VITE v[version] ready in [time]ms
Local: http://localhost:3000/
```

## 3. Access the Application

Open your browser and go to: **http://localhost:3000**

## First-Time User Flow

1. **Sign Up**
   - Click "Sign up" link on login page
   - Enter name, email, password
   - Click "Sign Up"
   - You'll be redirected to login

2. **Login**
   - Enter your email and password
   - Click "Login"
   - You'll see the dashboard

3. **Create a Project**
   - Click "Projects" in navigation
   - Click "+ New Project"
   - Fill in project details
   - Click "Create Project"

4. **Create a Task**
   - Click "Tasks" in navigation
   - Click "+ New Task"
   - Select the project you created
   - Fill in task details
   - Click "Create Task"

5. **View Dashboard**
   - Click "Dashboard" in navigation
   - See task statistics and overdue items

## 🔐 MongoDB Setup

### Option A: Local MongoDB

```bash
# Install MongoDB Community
# Start MongoDB
mongod

# Default connection string:
# MONGODB_URI=mongodb://localhost:27017/project-manager
```

### Option B: MongoDB Atlas (Cloud) - RECOMMENDED

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Replace in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-manager
   ```

## 📋 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## ✅ Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can signup new account
- [ ] Can login with credentials
- [ ] Dashboard displays correctly
- [ ] Can create projects
- [ ] Can create tasks
- [ ] Can view all pages

## 🛠️ Troubleshooting

### "Cannot find module" error

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "MongoDB connection failed"

- Check MONGODB_URI in .env
- Verify IP whitelist (for Atlas)
- Check username/password

### "Cannot POST /api/auth/login"

- Ensure backend is running
- Check VITE_API_URL in frontend .env
- Check for CORS issues

### Port already in use

```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

## 📚 Default Test Account

After setup, you can use:

- Email: `test@example.com`
- Password: `password123`

Or create your own account through signup!

## 🎯 Next Steps

1. Read the main [README.md](./README.md)
2. Check API documentation in backend README
3. Explore the codebase
4. Try creating projects and tasks
5. Invite team members

## 📞 Need Help?

- Check error messages in console
- Review logs in terminal
- Check browser DevTools (F12)
- Check backend console for API errors

---

**Enjoy using Project Manager! 🎉**
