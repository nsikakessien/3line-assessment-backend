# Settings Page – Untitled UI

**Node.js + Express** (backend REST API).

---

## Local Development

### 1. Backend

````bash
cd backend
npm install
npm run dev
# API running at http://localhost:3001

---

## Running Tests

### Backend (Jest + Supertest)

```bash
npm install
npm test
````

## API Endpoints

| Method | Endpoint                 | Description                                                |
| ------ | ------------------------ | ---------------------------------------------------------- |
| GET    | `/api/health`            | Health check                                               |
| GET    | `/api/roles`             | List all roles (supports `?status=`, `?type=`, `?search=`) |
| GET    | `/api/roles/:id`         | Get single role                                            |
| GET    | `/api/roles/active/list` | Get current user's active roles                            |
| POST   | `/api/roles`             | Create a new role                                          |
| PATCH  | `/api/roles/:id`         | Update role (status/name)                                  |
| DELETE | `/api/roles/:id`         | Delete a role                                              |

### Example requests

```bash
# Get all roles
curl http://localhost:3001/api/roles

# Filter active roles
curl http://localhost:3001/api/roles?status=Active

# Filter by type
curl http://localhost:3001/api/roles?type=DEFAULT

# Search by name
curl http://localhost:3001/api/roles?search=admin

# Create a role
curl -X POST http://localhost:3001/api/roles \
  -H "Content-Type: application/json" \
  -d '{"name":"Editor","type":"CUSTOM"}'
```

---

## Deploying to Vercel

### Deploy Backend

```bash
cd backend
npx vercel --prod
```

After deploying the backend, set the frontend env variable:

```bash
# In frontend directory
npx vercel env add VITE_API_URL production
# Enter: https://your-backend.vercel.app/api
npx vercel --prod
```

---
