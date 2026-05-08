## Project Overview
This repository contains a full-stack CRM assignment with:
- A Laravel API backend for authentication, lead management, notes, and dashboard statistics.
- A React frontend for login, dashboard analytics, lead CRUD, filtering, status updates, and notes.

The app is designed for simple lead pipeline tracking with protected routes and token-based auth.

## Tech Stack Used
- Backend: PHP 8.3, Laravel 13, Laravel Sanctum
- Frontend: React 19, Vite 8, React Router, Axios, Tailwind CSS
- Database: SQLite (default in `.env.example`), compatible with MySQL via Laravel env config

## Features Implemented
- Login/logout with API token authentication (Sanctum)
- Protected frontend routes after login
- Dashboard with:
  - total/new/qualified/won/lost lead counts
  - conversion rate
  - total and won deal values
- Lead management:
  - create lead
  - list leads
  - search (name/company/email)
  - filter by status/source/salesperson
  - edit lead
  - update lead status from lead details page
  - soft delete
  - bulk delete from leads table selection
- Notes:
  - add notes to leads
  - view note history with author and timestamp
- Lookup management:
  - add and list lead sources
  - add and list salespersons
- Seeded baseline data for first-time login and dropdown values



## How To Run Locally
### Prerequisites
- PHP 8.3+
- Composer
- Node.js 18+ and npm
- MySQL

### 1) Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

### 2) Database Setup

Set these values in `backend/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

After configuring DB, run:
```bash
cd backend
php artisan migrate
php artisan db:seed
```

### 3) Run Backend API
```bash
cd backend
php artisan serve
```
Backend API will run at `http://127.0.0.1:8000`.

### 4) Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
cp .env.example .env 2>/dev/null || true
```
If `frontend/.env.example` is not present, create `frontend/.env` with:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start frontend:
```bash
cd frontend
npm run dev
```
Frontend usually runs at `http://127.0.0.1:5173`.

## Environment Variables
### Backend (`backend/.env`)
Required/important variables:
- `APP_NAME`
- `APP_ENV`
- `APP_KEY`
- `APP_DEBUG`
- `APP_URL`
- `DB_CONNECTION`
- `DB_HOST` / `DB_PORT` / `DB_DATABASE` / `DB_USERNAME` / `DB_PASSWORD`

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL` (example: `http://127.0.0.1:8000/api`)

## Test Login Credentials
These are created by `DatabaseSeeder`:
- Email: `admin@example.com`
- Password: `password123`

## Database Setup
1. Configure DB in `backend/.env` (MySQL).
2. Run migrations: `php artisan migrate`
3. Seed initial data: `php artisan db:seed`
4. Login using seeded credentials above.


## Demo Video Link
https://drive.google.com/drive/folders/12yvxl6d4lEYFfBXNiAo7V6neLKo5oxMm?usp=sharing

## Application Link
https://crm-assignment-rust.vercel.app
