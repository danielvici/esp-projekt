# This was generated using AI!!! Will edit if errors are found.


# API Documentation

## Index

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Returns basic information and directions for using the API endpoints. |
| GET    | `/api`   | Redirects to the full API documentation. |

---

## Account Endpoints

| Method | Endpoint                                  | Description                                                    |
|--------|-------------------------------------------|----------------------------------------------------------------|
| POST   | `/api/account/login`                      | Logs in a user with username and password.                     |
| POST   | `/api/account/register`                   | Registers a new user with required details.                    |
| POST   | `/api/account/logout`                     | Logs a user out. (TODO)                                          |
| POST   | `/api/account/password/forgot`            | Initiates password recovery. (TODO)                            |
| POST   | `/api/account/password/reset`             | Resets the password. (TODO)                                      |
| POST   | `/api/account/password/change`            | Changes the password. (TODO)                                     |
| POST   | `/api/account/email/change-email`         | Changes the user's email address. (TODO)                       |
| POST   | `/api/account/email/verify-email`         | Verifies a user's email. (TODO)                                  |
| POST   | `/api/account/delete-account`             | Deletes the user account. (TODO)                               |
| POST   | `/api/account/block`                      | Blocks a user account. (TODO)                                    |

---

## Auth Endpoints

| Method | Endpoint             | Description                                      |
|--------|----------------------|--------------------------------------------------|
| GET    | `/api/auth`          | Auth endpoint (placeholder).                     |
| GET    | `/api/auth/verify`   | Verifies an authentication token. (TODO)         |
| GET    | `/api/auth/refresh`  | Refreshes an authentication token. (TODO)        |

---

## User Endpoints

| Method | Endpoint      | Description                                                |
|--------|---------------|------------------------------------------------------------|
| GET    | `/api/users`  | Retrieves a list of all users from the database.           |

---

## Chat Endpoints

| Method | Endpoint                         | Description                                                     |
|--------|----------------------------------|-----------------------------------------------------------------|
| GET    | `/api/chats`                     | Retrieves chats for a user (requires an Authorization header).   |
| GET    | `/api/chat/:id`                  | Retrieves details of a specific chat using its ID.              |
| POST   | `/api/chat/create`               | Creates a new chat with at least 2 participants.                |
| POST   | `/api/chat/:id/message`          | Sends a message to the specified chat.                          |
| DELETE | `/api/chat/:id`                  | Deletes a specific chat by its ID.                              |

---

## Post Endpoints

| Method | Endpoint                         | Description                                                       |
|--------|----------------------------------|-------------------------------------------------------------------|
| GET    | `/api/posts`                     | Retrieves all posts.                                               |
| GET    | `/api/post/:id`                  | Retrieves a specific post by its ID.                               |
| POST   | `/api/post/create`               | Creates a new post.                                                |
| PUT    | `/api/post/:id`                  | Updates an existing post (requires at least one update field).       |
| DELETE | `/api/post/:id`                  | Deletes a specific post by its ID.                                |
| POST   | `/api/post/:id/like`             | Likes a specific post.                                             |

---

## Comment Endpoints

| Method | Endpoint                          | Description                                                        |
|--------|-----------------------------------|--------------------------------------------------------------------|
| GET    | `/api/post/:id/comments`           | Retrieves all comments associated with a specific post.             |
| POST   | `/api/post/:id/comment`            | Adds a new comment to a specified post.                             |
| PUT    | `/api/comment/:id`                 | Updates an existing comment using its ID.                           |
| DELETE | `/api/comment/:id`                 | Deletes a specific comment by its ID.                               |
| POST   | `/api/comment/:id/like`            | Likes a specific comment.                                             |

> Note: Replace any `:id` placeholder in the URLs with the actual identifier when making requests.
> Note: Endpoints marked as TODO are placeholders for future implementation.

---

## Base URL

Assuming the server is running on port 8000, the base URL is:
```
http://localhost:8000
```

---

## Index & Documentation Routes

- **GET /**  
  A simple informational endpoint.
  - **Response:** `"For endpoints, use /api/{name}"`

  **Example:**
  ```bash
  curl http://localhost:8000/
  ```

- **GET /api**  
  Directs users for API documentation.
  - **Response:** `"For API Documentation, visit /docs"`

  **Example:**
  ```bash
  curl http://localhost:8000/api
  ```

---

## Account Endpoints

### 1. POST /api/account/login

Log in a user with their username and password.

- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "password": "secret123"
  }
  ```
- **Response:** On success returns status 200 with body `"Success"`. If unsuccessful, appropriate error messages are returned.

**Example:**
```bash
curl -X POST http://localhost:8000/api/account/login \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "secret123"}'
```

### 2. POST /api/account/register

Register a new user with all required fields.

- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "password": "secret123",
    "userGroup": "default",
    "displayname": "John Doe",
    "user_email": "john@example.com",
    "firstname": "John",
    "surname": "Doe"
  }
  ```
- **Response:** On success returns a status of 200 and a message indicating the user ID registration.

**Example:**
```bash
curl -X POST http://localhost:8000/api/account/register \
  -H "Content-Type: application/json" \
  -d '{
        "username": "johndoe",
        "password": "secret123",
        "userGroup": "default",
        "displayname": "John Doe",
        "user_email": "john@example.com",
        "firstname": "John",
        "surname": "Doe"
      }'
```

### Other Account Endpoints

- POST `/api/account/logout`
- POST `/api/account/password/forgot`
- POST `/api/account/password/reset`
- POST `/api/account/password/change`
- POST `/api/account/email/change-email`
- POST `/api/account/email/verify-email`
- POST `/api/account/delete-account`
- POST `/api/account/block`

These endpoints are marked as TODO and currently have no implemented logic.

---

## Auth Endpoints

- GET `/api/auth`
- GET `/api/auth/verify`
- GET `/api/auth/refresh`

These endpoints are also marked as TODO.

---

## User Endpoints

### GET /api/users

Retrieve all users from the database.

- **Response:** JSON array of user objects.

**Example:**
```bash
curl http://localhost:8000/api/users
```

---

## Chat Endpoints

### 1. GET /api/chats

Retrieve all chats for a user. Requires an "Authorization" header and an optional query parameter for userId.

- **Headers:**
  - Authorization: Bearer <token>  (only required to simulate authentication)
- **Query Parameter:**
  - userId (optional; defaults to "1" if not provided)
- **Response:** JSON array of chats for the specified user.

**Example:**
```bash
curl "http://localhost:8000/api/chats?userId=2" \
  -H "Authorization: Bearer mytoken123"
```

### 2. GET /api/chat/:id

Retrieve details of a specific chat identified by its ID.

- **Route Parameter:**
  - id: Chat ID
- **Response:** JSON object containing chat details.

**Example:**
```bash
curl http://localhost:8000/api/chat/10
```

### 3. POST /api/chat/create

Create a new chat with at least two participants.

- **Request Body:**
  ```json
  {
    "participants": [1, 2],
    "chatName": "Group Chat"
  }
  ```
- **Response:** Returns status 201 and a JSON object with the newly created "chatId".

**Example:**
```bash
curl -X POST http://localhost:8000/api/chat/create \
  -H "Content-Type: application/json" \
  -d '{"participants": [1, 2], "chatName": "Group Chat"}'
```

### 4. POST /api/chat/:id/message

Send a message to a specific chat.

- **Route Parameter:**
  - id: Chat ID
- **Request Body:**
  ```json
  {
    "senderId": 1,
    "content": "Hello, world!"
  }
  ```
- **Response:** Returns status 201 and a JSON object with the "messageId" of the new message.

**Example:**
```bash
curl -X POST http://localhost:8000/api/chat/10/message \
  -H "Content-Type: application/json" \
  -d '{"senderId": 1, "content": "Hello, world!"}'
```

### 5. DELETE /api/chat/:id

Delete a specific chat.

- **Route Parameter:**
  - id: Chat ID
- **Response:** Returns status 200 with a confirmation message.

**Example:**
```bash
curl -X DELETE http://localhost:8000/api/chat/10
```

---

## Post Endpoints

### 1. GET /api/posts

Retrieve all posts.

- **Response:** JSON array of posts.

**Example:**
```bash
curl http://localhost:8000/api/posts
```

### 2. GET /api/post/:id

Retrieve a specific post by its ID.

- **Route Parameter:**
  - id: Post ID
- **Response:** JSON object representing the post.

**Example:**
```bash
curl http://localhost:8000/api/post/15
```

### 3. POST /api/post/create

Create a new post.

- **Request Body:**
  ```json
  {
    "userId": 1,
    "postText": "This is a new post",
    "postType": "text"
  }
  ```
- **Response:** Returns status 201 with the "postId" of the created post.

**Example:**
```bash
curl -X POST http://localhost:8000/api/post/create \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "postText": "This is a new post", "postType": "text"}'
```

### 4. PUT /api/post/:id

Update an existing post. At least one of `postText` or `postType` must be provided.

- **Route Parameter:**
  - id: Post ID
- **Request Body:**
  ```json
  {
    "postText": "Updated post text",
    "postType": "text"
  }
  ```
- **Response:** Returns status 200 with a confirmation message.

**Example:**
```bash
curl -X PUT http://localhost:8000/api/post/15 \
  -H "Content-Type: application/json" \
  -d '{"postText": "Updated post text", "postType": "text"}'
```

### 5. DELETE /api/post/:id

Delete a specific post.

- **Route Parameter:**
  - id: Post ID
- **Response:** Returns status 200 with a message confirming deletion.

**Example:**
```bash
curl -X DELETE http://localhost:8000/api/post/15
```

### 6. POST /api/post/:id/like

Like a specific post.

- **Route Parameter:**
  - id: Post ID
- **Request Body:**
  ```json
  {
    "userId": 1
  }
  ```
- **Response:** Returns status 200 with a confirmation message.

**Example:**
```bash
curl -X POST http://localhost:8000/api/post/15/like \
  -H "Content-Type: application/json" \
  -d '{"userId": 1}'
```

---

## Comment Endpoints

### 1. GET /api/post/:id/comments

Retrieve all comments for a specific post.

- **Route Parameter:**
  - id: Post ID
- **Response:** JSON array of comments.

**Example:**
```bash
curl http://localhost:8000/api/post/15/comments
```

### 2. POST /api/post/:id/comment

Create a new comment on a specific post.

- **Route Parameter:**
  - id: Post ID
- **Request Body:**
  ```json
  {
    "userId": 1,
    "text": "This is a comment"
  }
  ```
- **Response:** Returns status 201 with the newly created "commentId".

**Example:**
```bash
curl -X POST http://localhost:8000/api/post/15/comment \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "text": "This is a comment"}'
```

### 3. PUT /api/comment/:id

Update an existing comment.

- **Route Parameter:**
  - id: Comment ID
- **Request Body:**
  ```json
  {
    "text": "Updated comment text"
  }
  ```
- **Response:** Returns status 200 with a confirmation message.

**Example:**
```bash
curl -X PUT http://localhost:8000/api/comment/20 \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated comment text"}'
```

### 4. DELETE /api/comment/:id

Delete a specific comment.

- **Route Parameter:**
  - id: Comment ID
- **Response:** Returns status 200 with a confirmation message.

**Example:**
```bash
curl -X DELETE http://localhost:8000/api/comment/20
```

### 5. POST /api/comment/:id/like

Like a specific comment.

- **Route Parameter:**
  - id: Comment ID
- **Request Body:**
  ```json
  {
    "userId": 1
  }
  ```
- **Response:** Returns status 200 with a confirmation message.

**Example:**
```bash
curl -X POST http://localhost:8000/api/comment/20/like \
  -H "Content-Type: application/json" \
  -d '{"userId": 1}'
```