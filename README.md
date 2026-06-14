# TaskFlow – Task Management System

TaskFlow is a full-stack MERN Task Management System that enables users to create, organize, track, prioritize, and analyze tasks with authentication, notifications, file attachments, analytics, and productivity insights.

## Features

- JWT Authentication & Protected Routes
- Task CRUD Operations
- Search, Filter & Sort Tasks
- Pagination
- Task Analytics Dashboard
- Overdue & Upcoming Task Tracking
- User Profile Management
- Change Password
- Notification System
- File Attachments
- Dark Mode Support
- Responsive User Interface

## Tech Stack

Frontend:

- React.js
- React Router DOM
- Tailwind CSS
- Axios

Backend:

- Node.js
- Express.js

Database:

- MongoDB Atlas

Authentication:

- JWT (JSON Web Token)
- bcryptjs

File Upload:

- Multer

## Installation

Clone Repository

```bash
git clone https://github.com/SolankiAryan21666/Task-Management-System.git
```

Install Backend Dependencies & Start Backend

```bash
cd server
npm install
npm run dev
```

Install Frontend Dependencies & Start Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create .env inside server folder

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## API Endpoints

### Authentication

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| POST   | /api/auth/register        | Register User    |
| POST   | /api/auth/login           | Login User       |
| GET    | /api/auth/me              | Get Current User |
| PUT    | /api/auth/profile         | Update Profile   |
| PUT    | /api/auth/change-password | Change Password  |

### Tasks

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | /api/tasks            | Create Task          |
| GET    | /api/tasks            | Get Tasks            |
| PUT    | /api/tasks/:id        | Update Task          |
| DELETE | /api/tasks/:id        | Delete Task          |
| GET    | /api/tasks/stats      | Dashboard Statistics |
| GET    | /api/tasks/analytics  | Task Analytics       |
| GET    | /api/tasks/overdue    | Overdue Tasks        |
| GET    | /api/tasks/upcoming   | Upcoming Tasks       |
| POST   | /api/tasks/:id/upload | Upload Attachment    |

### Notifications

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | /api/notifications          | Get Notifications      |
| PUT    | /api/notifications/:id/read | Mark Notification Read |

## Folder Structure

```text
Task-Management-System/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyticsCard/
│   │   │   │    └── AnalyticsCard.jsx
│   │   │   ├── Loader/
│   │   │   │    └── Loader.jsx
│   │   │   ├── Navbar/
│   │   │   │    └── Navbar.jsx
│   │   │   ├── NotificationDropdown/
│   │   │   │    └── NotificationDropdown.jsx
│   │   │   ├── StatCard/
│   │   │   │    └── StatCard.jsx
│   │   │   ├── TaskCard/
│   │   │   │    └── TaskCard.jsx
│   │   │   └── TaskForm/
│   │   │        └── TaskForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthContextProvider.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useTheme.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── notificationController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Notification.js
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── uploads/
│   │   └── (uploaded task files)
│   │
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Future Improvements

- Email Notifications
- Team Collaboration
- Kanban Board
- Real-Time Updates with Socket.IO

## Author

Aryan Solanki

B.E. Information Technology

L.D. College of Engineering, Ahmedabad

Tech Stack:
React.js | Node.js | Express.js | MongoDB | JWT | Tailwind CSS
