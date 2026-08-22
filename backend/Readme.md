# 🍔 Foodpanda Backend API

A RESTful backend API for a Foodpanda-style food delivery application built using Node.js, Express.js, MongoDB, and Mongoose.

The backend provides user authentication, JWT-based authorization, restaurant CRUD operations, validation, error handling, ownership protection, and basic API security.

---

## 📌 Project Overview

This backend was developed as part of a Foodpanda full-stack application.

The API provides:

- User registration
- User login
- JWT authentication
- Password hashing
- Protected routes
- Restaurant CRUD operations
- Restaurant ownership and authorization
- MongoDB database integration
- Mongoose schemas and validation
- Centralized error handling
- 404 route handling
- CORS
- Security middleware
- Rate limiting
- API testing with Postman
- Deployment using Render

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| dotenv | Environment variables |
| CORS | Cross-origin requests |
| Helmet | HTTP security headers |
| express-rate-limit | API rate limiting |
| Nodemon | Development server |
| Postman | API testing |
| Render | Backend deployment |

---

# 📁 Project Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── restaurantController.js
│   │
│   ├── middleware/
│   │   ├── logger.js
│   │   ├── authMiddleware.js
│   │   ├── validateRequest.js
│   │   ├── rateLimiter.js
│   │   ├── notFound.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   └── restaurant.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── restaurantRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── seed/
│   └── restaurants.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 4. Installation

Clone/download the project and install dependencies:
```
npm install
```

## - 5. Environment Variables

Create a .env file in the backend root:
```
- PORT=3000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- FRONTEND_URL=http://localhost:5173
```

### Environment variables
|Variable |	Description|
|---|---|
PORT |	Port used by Express |
MONGO_URI |	MongoDB connection string |
JWT_SECRET |	Secret used to sign JWT tokens |
FRONTEND_URL |	Allowed frontend origin |

```
Do not commit .env to GitHub because it contains sensitive credentials.
```

## 6. Running the Project
- Development:
```
npm run dev
```
- Production:
```
npm start
```
- Seed database:
```
npm run seed
```

The seed script inserts predefined restaurant data into MongoDB.
### Seed Database
The project contains a seed script for inserting predefined restaurant data into MongoDB.
- Run:
```
npm run seed
```
- The command executes:
```
node seed/restaurants.js
```
The seed script:
- Connects to MongoDB.
- Loads predefined restaurant data.
- Inserts the data into the restaurant collection.
- Closes the database connection.
- Exits the process.
⚠️ The seed script should be used carefully with production databases, especially if it removes existing data before inserting seed data.

## 7. API Base URL
- **Local:**
```
http://localhost:3000
```
- **Production:**
```
https://foodpanda-app-1.onrender.com
```

## 8. Authentication API
Register User

Creates a new user account.

Request
POST /api/auth/register
URL
/api/auth/register
Body
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
Success Response
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "name": "Test User",
    "email": "testuser@example.com"
  }
}
Status
201 Created

## 9. Login User

Authenticates an existing user and returns a JWT token.

Request
POST /api/auth/login
Body
{
  "email": "testuser@example.com",
  "password": "password123"
}
Success Response
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "testuser@example.com"
  }
}
Status
200 OK

The returned JWT must be sent with protected requests.

Authorization Header
Authorization: Bearer <JWT_TOKEN>

## 10. Restaurant API
Get All Restaurants

Returns all restaurants.

Request
GET /api/restaurants
Authentication

Not required.

Response
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Pizza House",
      "cuisine": "Italian",
      "rating": 4.5
    }
  ]
}
Status
200 OK

## 11. Get Restaurant By ID

Returns a single restaurant.

Request
GET /api/restaurants/:id

Example:

GET /api/restaurants/1
Authentication

Not required.

Success
200 OK
Restaurant not found
{
  "success": false,
  "message": "Restaurant not found"
}

Status:

404 Not Found

## 12. Create Restaurant

Creates a new restaurant.

Request
POST /api/restaurants
Authentication

Required.

Header
Authorization: Bearer <JWT_TOKEN>
Body
{
  "id": 100,
  "name": "Demo Pizza",
  "cuisine": "Italian",
  "rating": 4.5,
  "deliveryTime": "30 min",
  "price": 800,
  "image": "pizza.jpg",
  "discount": "20%",
  "description": "A demo restaurant"
}

The owner is obtained from the authenticated user's JWT rather than being manually supplied by the client.

Success
201 Created

## 13. Update Restaurant

Updates an existing restaurant.

Request
PUT /api/restaurants/:id

Example:

PUT /api/restaurants/100
Authentication

Required.

Authorization: Bearer <JWT_TOKEN>
Body
{
  "name": "Updated Pizza House",
  "rating": 4.8,
  "price": 900
}
Authorization

Only the restaurant owner can update the restaurant.

If another authenticated user attempts the operation:

403 Forbidden

## 14. Delete Restaurant

Deletes a restaurant.

Request
DELETE /api/restaurants/:id

Example:

DELETE /api/restaurants/100
Authentication

Required.

Authorization: Bearer <JWT_TOKEN>

Only the restaurant owner can delete it.

Success
200 OK

## 15. Restaurant Data Model

A restaurant contains:

{
  "id": 1,
  "name": "Pizza House",
  "cuisine": "Italian",
  "rating": 4.5,
  "deliveryTime": "30 min",
  "price": 800,
  "image": "pizza.jpg",
  "discount": "20%",
  "description": "Delicious Italian pizza",
  "owner": "USER_OBJECT_ID"
}
Validation
Field	Rule
id	Required, unique
name	Required
cuisine	Required
rating	Required, 0–5
deliveryTime	Required
price	Required, minimum 0
image	Required
discount	Required
description	Required
owner	Required for protected creation

## 16. Authentication & Authorization

The API uses JWT-based authentication.

Authentication flow
Register
   ↓
Password hashed with bcrypt
   ↓
User stored in MongoDB
   ↓
Login
   ↓
Credentials verified
   ↓
JWT generated
   ↓
Client receives token

For protected routes:

Client
   ↓
Authorization: Bearer JWT
   ↓
JWT Middleware
   ↓
Token verified
   ↓
req.user
   ↓
Controller

## 17. Restaurant Ownership

Restaurants are associated with users through the owner field.

User
  │
  │ _id
  ↓
Restaurant.owner

When a user creates a restaurant:

JWT
 ↓
Authenticated user ID
 ↓
Restaurant.owner

When updating or deleting:

Authenticated user
        ↓
Compare user ID
        ↓
Restaurant owner
        ↓
Match?
   ┌────┴────┐
  Yes        No
   ↓          ↓
Allow       403

## 18. Middleware

The backend uses middleware for reusable request processing.

Logger

Logs:

GET /api/restaurants
POST /api/auth/login
Authentication Middleware

Verifies JWT tokens for protected routes.

Rate Limiter

Limits excessive authentication requests.

Example:

10 requests / 15 minutes
Validation Middleware

Validates incoming request data before reaching the controller.

Not Found Middleware

Handles undefined routes with:

404 Not Found
Error Handler

Provides centralized error handling for the application.

## 19. Security

The API implements several security practices.

Helmet

Adds security-related HTTP headers.

CORS

Controls which frontend origins can access the API.

Rate Limiting

Protects authentication endpoints against excessive requests.

Password Hashing

Passwords are hashed using bcrypt before being stored.

JWT

JWT is used for authentication.

Authorization

Restaurant ownership prevents users from modifying other users' restaurants.

## 20. HTTP Status Codes
Status	Meaning
200	Request successful
201	Resource created
400	Invalid request/data
401	Authentication required/invalid
403	Access forbidden
404	Resource/route not found
409	Resource conflict
429	Too many requests
500	Internal server error

## 21. API Endpoint Summary
Method	Endpoint	Auth	Description
POST	/api/auth/register	No	Register user
POST	/api/auth/login	No	Login and receive JWT
GET	/api/restaurants	No	Get all restaurants
GET	/api/restaurants/:id	No	Get restaurant
POST	/api/restaurants	Yes	Create restaurant
PUT	/api/restaurants/:id	Yes + Owner	Update restaurant
DELETE	/api/restaurants/:id	Yes + Owner	Delete restaurant

## 22. Postman Collection

A Postman collection is included for testing the API.

The collection contains:

Foodpanda Backend API
│
├── Authentication
│   ├── Register
│   └── Login
│
├── Restaurants
│   ├── Get All Restaurants
│   ├── Get Restaurant By ID
│   ├── Create Restaurant
│   ├── Update Restaurant
│   └── Delete Restaurant
│
└── Error & Validation Tests

The Postman collection can be imported into Postman to test the API endpoints.

## 23. Deployment

The backend is deployed on Render.

Production base URL:

https://foodpanda-app-1.onrender.com

Example:

GET https://foodpanda-app-1.onrender.com/api/restaurants

## 24. Learning Outcomes

This project demonstrates the following backend concepts:

- Node.js runtime
- ES Modules
- Environment variables
- Express.js
- REST API design
- Routing
- Middleware
- MongoDB
- Mongoose
- Database schemas
- CRUD operations
- Relationships
- Validation
- Centralized error handling
- JWT authentication
- Password hashing
- Protected routes
- Authorization and ownership
- CORS
- Helmet
- Rate limiting
- API testing with Postman
- Deployment
