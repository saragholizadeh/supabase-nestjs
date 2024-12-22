# OTP Authentication System with NestJS and Supabase

This project implements a simple **authentication system** using **NestJS** and **Supabase**. It allows users to authenticate via **One-Time Passwords (OTP)**. The system utilizes **Supabase** for database management and **JWT** for token handling.

---

## Prerequisites

To run this project, ensure you have the following:

- **Node.js** (version 16 or higher)
- **NestJS CLI** (optional, for project management)
- **Supabase** project set up
- `.env` file with required configuration variables (explained below)

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your `.env` file with the following variables:

   ```env
   PORT=
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-anon-key>
   ```

4. Run the development server:

   ```bash
   npm run start:dev
   ```

5. Access the app at `http://localhost:3000`. (You can change the port at .env)

---

## Project Architecture

The project follows a modular structure:

- **`auth` module**: Handles user authentication and OTP verification.
- **`supabase` module**: Manages configuration and interactions with Supabase.
- **`get-user.guard`**: Custom guard for protecting routes.
- **`get-user.decorator`**: Access user data.
- **`transform.interceptor`**: Constant response for all responses (errors & success).
---

# Authentication API Documentation

This document describes the available API endpoints for authentication in this project. These endpoints are designed to handle OTP-based login and token management using Supabase and JWT.

## API Endpoints

### 1. **Sign In**
   - **URL**: `/auth/signin`
   - **Method**: `POST`
   - **Description**: Initiates the OTP-based login process by sending an OTP to the user's phone number.
   - **Request Body**:
     ```json
     {
       "email": "string"
     }
     ```
   - **Response**:
     ```json
     {   
        "success": true,
        "message": "Operation Successfully Completed.",
        "data": null
     }
     ```

### 2. **Verify OTP**
   - **URL**: `/auth/verify`
   - **Method**: `POST`
   - **Description**: Verifies the OTP provided by the user and issues an access token and a refresh token.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "code": "number"
     }
     ```
   - **Response**:
     ```json
     {
        "success": true,
        "message": "Operation Successfully Completed.",
        "data": {
            "message": "OTP verified successfully.",
            "user": {
                "id": "",
                "email": "",
                "emailConfirmed": "2024-12-22T17:51:06.911461Z",
                "role": ""
            },
            "session": {
                "accessToken": "",
                "refreshToken": "",
                "expiresAt": 1734893466
            }
        }
     }
     ```

### 3. **Refresh Token**
   - **URL**: `/auth/refreshToken`
   - **Method**: `POST`
   - **Description**: Refreshes the access token using a valid refresh token.
   - **Request Body**:
     ```json
     {
       "refreshToken": "string"
     }
     ```
   - **Response**:
     ```json
     {
        "success": true,
        "message": "Operation Successfully Completed.",
        "data": {
            "message": "OTP verified successfully.",
            "user": {
                "id": "",
                "email": "",
                "emailConfirmed": "2024-12-22T17:51:06.911461Z",
                "role": ""
            },
            "session": {
                "accessToken": "",
                "refreshToken": "",
                "expiresAt": 1734893466
            }
        }
     } 
     ```

### **Supabase Service**

Handles interactions with the Supabase API and database:

- Initializes the Supabase client using environment variables.
- Provides helper methods to query or interact with Supabase.

---

## Route Protection

### **JWT Auth Guard**

The `JwtAuthGuard` ensures only authenticated users can access protected routes. It verifies the `Authorization` header containing the JWT.

---

## License

This project is licensed under the MIT License.
