# AWS Cloud Club - DY Patil International University

Production-ready full-stack website with:

- React + Vite + TypeScript frontend
- Tailwind CSS + Framer Motion animations
- Node.js + Express + TypeScript backend
- MongoDB + Mongoose
- JWT authentication for admin
- Database-stored announcement posters

## Project Structure

- client
  - src/components
  - src/pages
  - src/hooks
  - src/services
  - src/types
  - src/utils
  - src/animations
- server
  - src/controllers
  - src/models
  - src/routes
  - src/middleware
  - src/types
  - src/config

## Features

- Public home page with AWS-inspired visual design
- Animated hero, section reveals, card hover effects, page transitions
- Dynamic announcement section with loading skeletons
- Admin login with JWT
- Admin dashboard with create, edit, and delete announcement functionality
- Poster upload stored in MongoDB
- Typed Axios layer with interceptors
- Zustand-based auth state
- Toast notifications and robust loading/error handling

## API Endpoints

- POST /api/admin/login
- GET /api/announcements
- POST /api/announcements
- PUT /api/announcements/:id
- DELETE /api/announcements/:id

Protected routes require Authorization: Bearer <token>.

## Environment Setup

### Server

Set values in server/.env.

Required keys:

- PORT
- NODE_ENV
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- ADMIN_EMAIL
- ADMIN_PASSWORD
- CLIENT_URL

### Client

Copy client/.env.example to client/.env and set:

- VITE_API_URL

Default local value:

- http://localhost:5000/api

## Run Locally

1. Install dependencies
   - client: pnpm install
   - server: pnpm install

2. Start backend
   - cd server
   - pnpm run dev

3. Start frontend
   - cd client
   - pnpm run dev

4. Build for production
   - client: pnpm run build
   - server: pnpm run build

## Deployment Notes

Frontend:

- Deploy client/dist to Vercel or any static hosting provider
- Set VITE_API_URL to deployed backend URL

Backend:

- Deploy server on AWS EC2, Render, or similar
- Build with pnpm run build and run with pnpm run start
- Provide environment variables from secure secret manager

Storage:

- Announcement posters are stored in MongoDB as encoded image data
- Keep image size limits and validation in place to avoid oversized documents

## Security Notes

- Use a strong JWT_SECRET in production
- Do not commit .env files
- Set strict CORS CLIENT_URL to your frontend domain
- Use HTTPS in production for frontend and backend
