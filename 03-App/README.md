# 📱 Social Network — Mobile App

Full-stack social network mobile application built with **React Native (Expo)** and **FastAPI (Python)**.

## 🏗️ Architecture

```
├── backend/          # FastAPI REST API (Python)
├── mobile/           # React Native + Expo (TypeScript)
└── docker-compose.yml
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native + Expo (TypeScript) |
| Backend API | FastAPI (Python 3.11+) |
| Database | PostgreSQL 16 |
| ORM | SQLAlchemy 2.0 + Alembic |
| Auth | JWT + Google OAuth + Apple Sign-In |
| Storage | Local (with abstraction for cloud migration) |

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **Docker** (for PostgreSQL)
- **Expo Go** app on your phone (for mobile testing)

### 1. Start the Database

```bash
docker-compose up -d
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env

# Run migrations (first time)
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs available at: http://localhost:8000/docs

### 3. Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Start Expo dev server
npx expo start
```

Scan the QR code with Expo Go on your phone.

## 📡 API Endpoints

### Auth
- `POST /api/v1/auth/register` — Register with email/password
- `POST /api/v1/auth/login` — Login with email/password
- `POST /api/v1/auth/refresh` — Refresh access token
- `POST /api/v1/auth/login/google` — Google OAuth login
- `POST /api/v1/auth/login/apple` — Apple Sign-In

### Users
- `GET /api/v1/users/me` — Get my profile
- `PUT /api/v1/users/me` — Update my profile
- `PUT /api/v1/users/me/avatar` — Upload avatar
- `GET /api/v1/users/{id}` — Get user profile
- `POST /api/v1/users/{id}/follow` — Follow/unfollow toggle

### Posts
- `POST /api/v1/posts/` — Create post
- `GET /api/v1/posts/{id}` — Get post
- `PUT /api/v1/posts/{id}` — Update post
- `DELETE /api/v1/posts/{id}` — Delete post
- `GET /api/v1/posts/feed/timeline` — Get home feed
- `POST /api/v1/posts/{id}/like` — Like/unlike toggle
- `POST /api/v1/posts/{id}/comments` — Add comment
- `GET /api/v1/posts/{id}/comments` — Get comments

### Notifications
- `GET /api/v1/notifications/` — Get notifications
- `GET /api/v1/notifications/unread-count` — Unread count
- `PUT /api/v1/notifications/{id}/read` — Mark as read
- `PUT /api/v1/notifications/read-all` — Mark all as read

## 🧪 Testing

```bash
cd backend
pytest -v
```

## 📄 License

Private — All rights reserved.
