# Mini Job Board

A full-stack job board application built for the Synfinity Dynamics technical assessment. Public users can browse, search, and filter job listings. Authenticated users can post new jobs.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (TypeScript), Tailwind CSS, Redux Toolkit |
| Backend | Node.js, Express.js (TypeScript) |
| Database | MongoDB Atlas via Mongoose |
| Authentication | Custom JWT (email/password) |
| Deployment | Vercel (frontend) + Render/Railway (backend) |

**Architecture note:** The assessment allows Next.js API routes or Express. This project uses a **separate Express.js backend** (`/backend`) and a **Next.js frontend** (`/frontend`), as requested.

## Features

- User registration and login with JWT
- Protected routes with client + server-side auth validation
- Session persistence across page refreshes (localStorage + Redux)
- Public job listing page with server-side search and filter
- Protected job posting form with client + server validation
- Responsive UI with loading and empty states
- Displays the name of the user who posted each job (bonus)

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Authenticate and return JWT |
| GET | `/api/jobs?search=&type=` | No | Fetch jobs with optional filters |
| POST | `/api/jobs` | Yes | Create a new job listing |

## Project Structure

```
job-board-react-node/
├── backend/          # Express API server
│   ├── src/
│   │   ├── config/   # Database connection
│   │   ├── middleware/  # JWT auth middleware
│   │   ├── models/   # Mongoose schemas
│   │   ├── routes/   # API routes
│   │   └── utils/    # Validation helpers
│   └── .env.example
├── frontend/         # Next.js application
│   ├── src/
│   │   ├── app/      # Pages (App Router)
│   │   ├── components/
│   │   ├── lib/      # API client & validation
│   │   ├── store/    # Redux Toolkit slices
│   │   └── types/
│   └── .env.example
└── README.md
```

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd job-board-react-node
```

### 2. Set up MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user and whitelist your IP (or `0.0.0.0/0` for development)
3. Copy the connection string

### 3. Configure environment variables

**Backend** — copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/jobboard?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

**Frontend** — copy `frontend/.env.example` to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Install dependencies

```bash
npm run install:all
```

Or install separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 5. Run locally

Start the backend (terminal 1):

```bash
npm run dev:backend
```

Start the frontend (terminal 2):

```bash
npm run dev:frontend
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Deployment

### Frontend (Vercel)

1. Push the repo to GitHub
2. Import the `frontend` directory in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=<your-backend-url>`
4. Deploy

### Backend (Render / Railway)

1. Create a new Web Service pointing to the `backend` directory
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Set environment variables from `backend/.env.example`
5. Set `FRONTEND_URL` to your Vercel deployment URL

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiration (e.g. `7d`) |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

## Known Limitations

- Pagination/infinite scroll not implemented (bonus feature)
- Users cannot delete their own listings (bonus feature)
- No unit tests included (bonus feature)
- Backend must be deployed separately from the frontend due to the Express + Next.js split architecture

## License

MIT
