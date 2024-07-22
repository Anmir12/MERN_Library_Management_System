# Library Management System

## Overview

This is a full-stack Library Management System built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to manage books, borrow and return them, and perform user authentication using JWT.

## Folder Structure

- `Frontend/` - Contains the React frontend application.
- `Backend/` - Contains the Node.js backend application.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Setup Instructions

### Backend

1. Navigate to the `Backend` folder:

    ```sh
    cd Backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the backend server:

    ```sh
    npm start
    ```

### Frontend

1. Navigate to the `Frontend` folder:

    ```sh
    cd Frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```
## Authentication API
The Authentication API provides endpoints for user authentication and registration within the Library Management System. This API is essential for managing user access and accounts.

Endpoints
User Login
Endpoint: POST /users/login
Description: Authenticates a user and returns an authorization token.
Request Body:
Requires a JSON object containing username and password.
Success Response:
Returns a JSON object with an authentication token that must be used for subsequent requests requiring authorization.
User Registration
Endpoint: POST /users/register
Description: Registers a new user in the system.
Request Body:
Requires a JSON object containing username and password.
Success Response:
Returns a JSON object with user details upon successful registration.
Usage
Login: Use the provided login endpoint to authenticate users and obtain an authorization token.
Register: Use the registration endpoint to create a new user account.
Notes
Make sure that the backend server is running at http://localhost:5000/api.
The Authorization header is managed automatically using the token stored in the application’s state.
# Book API

The `bookApi` provides endpoints for managing books and borrowings in the library management system.

## Setup and Instructions

### 1. **Get Books**

- **Endpoint:** `GET /books`
- **Description:** Retrieves a list of all books.
- **Usage:** Fetch the list of books from the API.

### 2. **Get Book By ID**

- **Endpoint:** `GET /books/:id`
- **Description:** Retrieves a specific book by its ID.
- **Usage:** Fetch details of a book using its ID.

### 3. **Create Book**

- **Endpoint:** `POST /books`
- **Description:** Creates a new book entry.
- **Usage:** Submit a new book's details to the API to create it.

### 4. **Update Book**

- **Endpoint:** `PUT /books/:id`
- **Description:** Updates an existing book entry by its ID.
- **Usage:** Submit updated details for an existing book using its ID.

### 5. **Delete Book**

- **Endpoint:** `DELETE /books/:id`
- **Description:** Deletes a book entry by its ID.
- **Usage:** Request to delete a specific book by its ID.

### 6. **Borrow Book**

- **Endpoint:** `POST /borrowings/borrow`
- **Description:** Borrows a book by its ID.
- **Request Body:** 
  ```json
  {
    "bookId": "string"
  }


## Additional Information

- Ensure MongoDB is running on `localhost`.
- Configure environment variables as needed for backend services.

## License

[MIT License](https://opensource.org/licenses/MIT)
