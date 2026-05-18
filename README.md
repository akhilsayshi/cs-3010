# Passion Project - Express API

Express REST API for My Passion Project React app.

## Getting Started

```bash
npm install
npm start
```

Server runs on http://localhost:3001

For development with auto-restart:
```bash
npm run dev
```

## Endpoints

| Method | URL | Description | Response |
|--------|-----|-------------|----------|
| POST | /api/login | Handle user login | 200 |
| POST | /api/register | Handle user registration | 201 |
| POST | /api/account | Update account data | 201 |
| GET | /api/account?username= | Fetch account data | 200 |

## Notes

- No database or data validation - all requests are accepted and logged to console
- CORS enabled so the React app at localhost:3000 can communicate with this API
