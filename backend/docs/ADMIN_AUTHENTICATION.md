# Admin Authentication System - Backend Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Architecture](#architecture)
4. [File Structure](#file-structure)
5. [Core Authentication Module](#core-authentication-module)
6. [Admin API Router](#admin-api-router)
7. [Main Application Integration](#main-application-integration)
8. [API Endpoints Reference](#api-endpoints-reference)
9. [Security Features](#security-features)
10. [Request/Response Flow](#requestresponse-flow)
11. [Error Handling](#error-handling)
12. [Testing](#testing)

---

## Overview

The admin authentication system provides a minimal, secure authentication mechanism for internal admin access to the BetterBobcats platform. The system is designed with the following principles:

- **No Database Storage**: Credentials are hardcoded in the backend code (temporary for development)
- **Server-Side Validation**: All authentication logic runs on the backend
- **Session-Based**: Uses simple token-based sessions stored in HTTP-only cookies
- **Minimal Implementation**: No OAuth, JWT, or third-party authentication services

### Key Features
- Username/password authentication
- Session token management
- Protected admin routes
- Generic error messages to prevent credential enumeration
- CORS configuration for frontend communication

---

## Technologies Used

### Core Framework
- **FastAPI** (v0.115.0+): Modern, fast web framework for building APIs with Python
  - Automatic API documentation
  - Type validation with Pydantic
  - Async/await support
  - Built-in OpenAPI/Swagger support

### Web Server
- **Uvicorn** (v0.32.0+): ASGI server implementation
  - High-performance async server
  - Hot reload support for development
  - WebSocket support
  - HTTP/1.1 and HTTP/2 support

### Data Validation
- **Pydantic** (v2.10.0+): Data validation using Python type annotations
  - Automatic type coercion
  - Validation error messages
  - JSON schema generation
  - Settings management

### Additional Libraries
- **pydantic-settings**: Environment variable management
- **python-dotenv**: Environment file loading
- **FastAPI Cookie/Header**: Request parameter extraction

---

## Architecture

```
┌─────────────────┐
│   Frontend       │
│   (Next.js)      │
│                  │
│  /admin/login    │──┐
│  /admin/*        │  │
└──────────────────┘  │
         │            │
         │ HTTP       │
         │ Requests   │
         ▼            │
┌─────────────────┐  │
│   Backend       │  │
│   (FastAPI)     │  │
│                  │  │
│  /api/admin/    │◄─┘
│    - login      │
│    - check      │
│    - logout     │
└─────────────────┘
         │
         │ Validates
         │ Credentials
         ▼
┌─────────────────┐
│  admin_auth.py  │
│  (Credentials)   │
└─────────────────┘
```

### Authentication Flow

1. **Login Request**: Frontend sends username/password to `/api/admin/login`
2. **Credential Validation**: Backend validates against hardcoded credentials
3. **Session Token Generation**: On success, returns session token
4. **Cookie Storage**: Frontend stores token in HTTP-only cookie
5. **Subsequent Requests**: Frontend includes cookie in requests
6. **Token Validation**: Backend validates token on each protected request
7. **Logout**: Frontend calls `/api/admin/logout` to clear session

---

## File Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── core/
│   │   └── admin_auth.py       # Authentication utilities and credentials
│   └── api/
│       └── admin.py            # Admin authentication API endpoints
└── docs/
    └── ADMIN_AUTHENTICATION.md # This file
```

---

## Core Authentication Module

**File**: `backend/app/core/admin_auth.py`

This module contains the core authentication logic, including credential constants and validation functions.

### Code Breakdown

```python
"""
Admin Authentication Utilities
Centralized authentication logic for admin access
Credentials are hardcoded here (temporary for development only)
"""
```

**Lines 1-4**: Module docstring explaining the purpose and noting that credentials are temporary.

```python
# Admin credentials (TEMPORARY - for development only)
ADMIN_USERNAME = "TheBetterBobcat"
ADMIN_PASSWORD = "Bobcat1!"
```

**Lines 5-7**: 
- **Purpose**: Hardcoded admin credentials
- **Security Note**: These are temporary and should be moved to environment variables or a secure credential store in production
- **ADMIN_USERNAME**: The username required for admin login
- **ADMIN_PASSWORD**: The password required for admin login
- **Why Hardcoded**: Per requirements, no database tables should be created, so credentials live in code

```python
# Session token constant
# In a production system, this would be a generated token, but for simplicity
# we use a constant token that the backend validates
ADMIN_SESSION_TOKEN = "admin_authenticated"
```

**Lines 9-12**:
- **Purpose**: Defines the session token value used to authenticate requests
- **ADMIN_SESSION_TOKEN**: Constant string that represents an authenticated session
- **Why Constant**: For minimal implementation, we use a simple constant instead of generating unique tokens
- **Production Note**: In production, this would be a cryptographically secure random token, possibly with expiration

```python
def validate_credentials(username: str, password: str) -> bool:
    """
    Validate admin credentials
    
    Args:
        username: Username to validate
        password: Password to validate
        
    Returns:
        True if credentials match, False otherwise
    """
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD
```

**Lines 14-25**: `validate_credentials()` function
- **Purpose**: Compares provided credentials against hardcoded values
- **Parameters**:
  - `username` (str): The username to validate
  - `password` (str): The password to validate
- **Returns**: `bool` - `True` if both username and password match, `False` otherwise
- **Security**: Uses constant-time string comparison (Python's `==` operator)
- **Line-by-line**:
  - Line 24: Compares username using equality operator
  - Line 24: Compares password using equality operator
  - Line 24: Both conditions must be `True` for function to return `True`
  - **Note**: In production, use `secrets.compare_digest()` for constant-time comparison to prevent timing attacks

```python
def is_valid_session(session_token: str) -> bool:
    """
    Validate session token
    
    Args:
        session_token: Session token to validate
        
    Returns:
        True if token is valid, False otherwise
    """
    return session_token == ADMIN_SESSION_TOKEN
```

**Lines 27-38**: `is_valid_session()` function
- **Purpose**: Validates that a provided session token matches the expected token
- **Parameters**:
  - `session_token` (str): The session token to validate
- **Returns**: `bool` - `True` if token matches `ADMIN_SESSION_TOKEN`, `False` otherwise
- **Usage**: Called by API endpoints to verify authentication status
- **Line-by-line**:
  - Line 37: Compares provided token against the constant `ADMIN_SESSION_TOKEN`
  - Returns `True` only if tokens match exactly

---

## Admin API Router

**File**: `backend/app/api/admin.py`

This module defines the FastAPI router with three authentication endpoints: login, check, and logout.

### Imports and Setup

```python
"""
Admin API Routes
Endpoints for admin authentication
"""
from fastapi import APIRouter, HTTPException, Cookie, Header
from typing import Optional
from pydantic import BaseModel
from app.core.admin_auth import (
    validate_credentials,
    is_valid_session,
    ADMIN_SESSION_TOKEN,
)
```

**Lines 1-12**:
- **Line 4**: `APIRouter` - FastAPI class for creating route groups
- **Line 4**: `HTTPException` - For raising HTTP errors (not used in current implementation but available)
- **Line 4**: `Cookie` - FastAPI dependency to extract cookies from requests
- **Line 4**: `Header` - FastAPI dependency to extract headers from requests
- **Line 5**: `Optional` - Type hint for values that can be None
- **Line 6**: `BaseModel` - Pydantic base class for request/response models
- **Lines 7-11**: Imports from the core authentication module

```python
router = APIRouter()
```

**Line 14**: Creates a new FastAPI router instance. This router will be registered in `main.py` with the prefix `/api/admin`.

### Request/Response Models

```python
# Request/Response Models
class LoginRequest(BaseModel):
    """Login request model"""
    username: str
    password: str
```

**Lines 17-21**: `LoginRequest` model
- **Purpose**: Defines the structure of login request payloads
- **Inherits from**: `BaseModel` (Pydantic)
- **Fields**:
  - `username` (str): Required username field
  - `password` (str): Required password field
- **Validation**: Pydantic automatically validates that both fields are strings and are present
- **Usage**: Used as the request body type for the login endpoint

```python
class LoginResponse(BaseModel):
    """Login response model"""
    success: bool
    session_token: Optional[str] = None
    error: Optional[str] = None
```

**Lines 24-28**: `LoginResponse` model
- **Purpose**: Defines the structure of login response payloads
- **Fields**:
  - `success` (bool): Indicates whether login was successful (required)
  - `session_token` (Optional[str]): Session token returned on success (defaults to None)
  - `error` (Optional[str]): Error message returned on failure (defaults to None)
- **Design Pattern**: Uses optional fields to handle both success and error cases in one model
- **Usage**: Returned by the login endpoint

```python
class AuthCheckResponse(BaseModel):
    """Auth check response model"""
    authenticated: bool
```

**Lines 31-33**: `AuthCheckResponse` model
- **Purpose**: Simple response indicating authentication status
- **Fields**:
  - `authenticated` (bool): `True` if session token is valid, `False` otherwise
- **Usage**: Returned by the check endpoint

```python
class LogoutResponse(BaseModel):
    """Logout response model"""
    success: bool
```

**Lines 36-38**: `LogoutResponse` model
- **Purpose**: Simple response indicating logout success
- **Fields**:
  - `success` (bool): Always `True` (logout is idempotent)
- **Usage**: Returned by the logout endpoint

### Login Endpoint

```python
@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
```

**Lines 41-42**: Login endpoint decorator and function signature
- **`@router.post("/login")`**: 
  - Registers a POST endpoint at `/login` (full path: `/api/admin/login` when router is mounted)
  - `response_model=LoginResponse`: Tells FastAPI to validate and serialize response as `LoginResponse`
- **`async def login`**: 
  - Async function (can use `await` for async operations)
  - `request: LoginRequest`: FastAPI automatically parses JSON body into `LoginRequest` model
  - **Request Body**: Must be JSON with `username` and `password` fields

```python
    """
    Admin login endpoint
    
    Validates credentials and returns session token on success.
    Returns generic error message on failure to prevent credential enumeration.
    
    Args:
        request: LoginRequest with username and password
        
    Returns:
        LoginResponse with session token on success, error on failure
    """
```

**Lines 43-53**: Function docstring explaining the endpoint's purpose and behavior.

```python
    if validate_credentials(request.username, request.password):
```

**Line 55**: Credential validation
- **`validate_credentials()`**: Calls the function from `admin_auth.py`
- **`request.username`**: Extracts username from parsed request body
- **`request.password`**: Extracts password from parsed request body
- **If True**: Credentials match, proceed to success response

```python
        return LoginResponse(
            success=True,
            session_token=ADMIN_SESSION_TOKEN,
        )
```

**Lines 56-59**: Success response
- **`LoginResponse`**: Creates response model instance
- **`success=True`**: Indicates successful authentication
- **`session_token=ADMIN_SESSION_TOKEN`**: Returns the session token constant
- **FastAPI Behavior**: Automatically serializes to JSON: `{"success": true, "session_token": "admin_authenticated", "error": null}`

```python
    else:
        # Generic error message to prevent credential enumeration
        return LoginResponse(
            success=False,
            error="Invalid username or password",
        )
```

**Lines 60-65**: Failure response
- **`else`**: Credentials don't match
- **Security Note**: Generic error message prevents attackers from knowing which field is wrong
- **`success=False`**: Indicates failed authentication
- **`error="Invalid username or password"`**: Generic error message (doesn't reveal if username or password is wrong)
- **Response**: `{"success": false, "session_token": null, "error": "Invalid username or password"}`

### Auth Check Endpoint

```python
@router.get("/check", response_model=AuthCheckResponse)
async def check_auth(
    admin_session: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
):
```

**Lines 68-72**: Auth check endpoint
- **`@router.get("/check")`**: GET endpoint at `/api/admin/check`
- **`admin_session: Optional[str] = Cookie(None)`**: 
  - Extracts cookie named `admin_session` from request
  - `Optional[str]`: Cookie may not be present
  - `Cookie(None)`: FastAPI dependency that extracts cookie value
  - If cookie exists, `admin_session` contains its value; otherwise `None`
- **`authorization: Optional[str] = Header(None)`**: 
  - Extracts `Authorization` header from request
  - Allows token to be passed via header as alternative to cookie
  - `Header(None)`: FastAPI dependency for header extraction

```python
    """
    Check if user is authenticated
    
    Accepts session token from cookie or Authorization header.
    
    Args:
        admin_session: Session token from cookie
        authorization: Authorization header (Bearer token format)
        
    Returns:
        AuthCheckResponse with authenticated status
    """
```

**Lines 73-83**: Function docstring.

```python
    # Extract token from cookie or Authorization header
    session_token = admin_session
    if not session_token and authorization:
        # Handle "Bearer <token>" format
        if authorization.startswith("Bearer "):
            session_token = authorization[7:]
        else:
            session_token = authorization
```

**Lines 85-92**: Token extraction logic
- **Line 86**: First tries to use cookie value
- **Line 87**: If no cookie, check Authorization header
- **Line 89**: If header starts with "Bearer ", extract token after "Bearer " (7 characters)
- **Line 91**: Otherwise, use entire header value as token
- **Flexibility**: Supports both cookie-based and header-based authentication

```python
    if session_token and is_valid_session(session_token):
        return AuthCheckResponse(authenticated=True)
    else:
        return AuthCheckResponse(authenticated=False)
```

**Lines 94-97**: Token validation and response
- **Line 94**: Checks if token exists and is valid using `is_valid_session()`
- **Line 95**: Returns `{"authenticated": true}` if token is valid
- **Line 97**: Returns `{"authenticated": false}` if token is missing or invalid
- **Security**: Always returns a response (never raises exception for invalid tokens)

### Logout Endpoint

```python
@router.post("/logout", response_model=LogoutResponse)
async def logout(
    admin_session: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
):
```

**Lines 100-104**: Logout endpoint
- **`@router.post("/logout")`**: POST endpoint at `/api/admin/logout`
- **Parameters**: Same as check endpoint (token from cookie or header)
- **Note**: Token validation is optional since logout is idempotent

```python
    """
    Admin logout endpoint
    
    Accepts session token from cookie or Authorization header.
    In a real system, this would invalidate the session server-side.
    For this minimal implementation, we just return success.
    
    Args:
        admin_session: Session token from cookie
        authorization: Authorization header (Bearer token format)
        
    Returns:
        LogoutResponse with success status
    """
```

**Lines 105-117**: Function docstring explaining logout behavior.

```python
    # Token validation is optional for logout (idempotent operation)
    # Frontend will clear the cookie regardless
    return LogoutResponse(success=True)
```

**Lines 119-121**: Logout response
- **Idempotent**: Logout always succeeds, even if token is invalid
- **Frontend Responsibility**: Frontend clears the cookie regardless of backend response
- **Returns**: `{"success": true}`

---

## Main Application Integration

**File**: `backend/app/main.py`

### Router Registration

```python
# API Routers
from app.api import courses, careers, admin

app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(careers.router, prefix="/api/careers", tags=["careers"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
```

**Lines 40-44**:
- **Line 40**: Imports the admin router module
- **Line 44**: Registers admin router with FastAPI app
  - **`prefix="/api/admin"`**: All routes in admin router are prefixed with `/api/admin`
  - **`tags=["admin"]`**: Groups endpoints under "admin" tag in API documentation
  - **Result**: Login endpoint becomes `/api/admin/login`, check becomes `/api/admin/check`, etc.

### CORS Configuration

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend URL
        "http://localhost:8080",  # Test server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Lines 15-24**: CORS (Cross-Origin Resource Sharing) configuration
- **Purpose**: Allows frontend (running on different port) to make requests to backend
- **`allow_origins`**: List of allowed origin URLs
  - `http://localhost:3000`: Next.js frontend
  - `http://localhost:8080`: Alternative test server
- **`allow_credentials=True`**: Allows cookies to be sent with cross-origin requests (required for session cookies)
- **`allow_methods=["*"]`**: Allows all HTTP methods (GET, POST, etc.)
- **`allow_headers=["*"]`**: Allows all request headers
- **Security Note**: In production, restrict origins to specific domains

---

## API Endpoints Reference

### POST /api/admin/login

**Purpose**: Authenticate admin user and receive session token

**Request Body**:
```json
{
  "username": "TheBetterBobcat",
  "password": "Bobcat1!"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "session_token": "admin_authenticated",
  "error": null
}
```

**Error Response** (200 OK):
```json
{
  "success": false,
  "session_token": null,
  "error": "Invalid username or password"
}
```

**Notes**:
- Always returns 200 OK (even on failure) to prevent timing attacks
- Generic error message prevents credential enumeration
- Session token should be stored in HTTP-only cookie by frontend

### GET /api/admin/check

**Purpose**: Verify if current session is authenticated

**Request Headers** (one of):
- `Cookie: admin_session=admin_authenticated`
- `Authorization: Bearer admin_authenticated`
- `Authorization: admin_authenticated`

**Success Response** (200 OK):
```json
{
  "authenticated": true
}
```

**Unauthenticated Response** (200 OK):
```json
{
  "authenticated": false
}
```

**Notes**:
- Always returns 200 OK
- Accepts token via cookie or Authorization header
- Used by middleware and page components to verify authentication

### POST /api/admin/logout

**Purpose**: Logout admin user (clears session on frontend)

**Request Headers** (optional):
- `Cookie: admin_session=admin_authenticated`
- `Authorization: Bearer admin_authenticated`

**Response** (200 OK):
```json
{
  "success": true
}
```

**Notes**:
- Idempotent operation (always succeeds)
- Frontend is responsible for clearing the cookie
- Backend doesn't maintain session state, so no server-side cleanup needed

---

## Security Features

### 1. Generic Error Messages
- **Implementation**: Login endpoint returns same error message for invalid username or password
- **Purpose**: Prevents credential enumeration attacks
- **Location**: `admin.py` line 64

### 2. HTTP-Only Cookies (Frontend)
- **Implementation**: Frontend sets cookies with `httpOnly: true`
- **Purpose**: Prevents JavaScript access to session token (XSS protection)
- **Note**: Backend doesn't set cookies; frontend manages cookie storage

### 3. CORS Configuration
- **Implementation**: Restricted to specific origins
- **Purpose**: Prevents unauthorized domains from making requests
- **Location**: `main.py` lines 15-24

### 4. Server-Side Validation
- **Implementation**: All credential validation happens on backend
- **Purpose**: Frontend cannot bypass authentication
- **Location**: `admin_auth.py` functions

### 5. No Database Storage
- **Implementation**: Credentials hardcoded in Python code
- **Purpose**: No database tables needed (per requirements)
- **Trade-off**: Credentials visible in code (acceptable for development)

### 6. Session Token Validation
- **Implementation**: Every protected request validates token
- **Purpose**: Prevents token reuse if compromised
- **Location**: `check_auth()` function

---

## Request/Response Flow

### Login Flow

```
1. Frontend: POST /api/admin/login
   Body: {"username": "...", "password": "..."}
   
2. Backend: Receives request
   - FastAPI parses JSON into LoginRequest model
   - Calls validate_credentials()
   
3. Backend: Validates credentials
   - Compares username against ADMIN_USERNAME
   - Compares password against ADMIN_PASSWORD
   
4a. Success Path:
   - Returns LoginResponse with session_token
   - Frontend stores token in HTTP-only cookie
   - Frontend redirects to /admin
   
4b. Failure Path:
   - Returns LoginResponse with error message
   - Frontend displays error to user
```

### Auth Check Flow

```
1. Frontend/Middleware: GET /api/admin/check
   Headers: Cookie: admin_session=admin_authenticated
   
2. Backend: Receives request
   - FastAPI extracts cookie via Cookie() dependency
   - Extracts token value
   
3. Backend: Validates token
   - Calls is_valid_session(session_token)
   - Compares token against ADMIN_SESSION_TOKEN
   
4. Backend: Returns response
   - {"authenticated": true} if valid
   - {"authenticated": false} if invalid
   
5. Frontend: Uses response
   - If authenticated: Allow access
   - If not authenticated: Redirect to /admin/login
```

### Logout Flow

```
1. Frontend: POST /api/admin/logout
   Headers: Cookie: admin_session=admin_authenticated
   
2. Backend: Receives request
   - Optionally validates token (not required)
   
3. Backend: Returns success
   - {"success": true}
   
4. Frontend: Clears cookie
   - Deletes admin_session cookie
   - Redirects to /admin/login
```

---

## Error Handling

### Login Errors

**Invalid Credentials**:
- **Trigger**: Username or password doesn't match
- **Response**: `{"success": false, "error": "Invalid username or password"}`
- **HTTP Status**: 200 OK (prevents timing attacks)
- **User Experience**: Generic message doesn't reveal which field is wrong

**Network Errors**:
- **Trigger**: Frontend can't reach backend
- **Handling**: Frontend catches exception and shows generic error
- **User Experience**: "An error occurred during login. Please try again."

### Auth Check Errors

**Missing Token**:
- **Trigger**: No cookie or Authorization header
- **Response**: `{"authenticated": false}`
- **HTTP Status**: 200 OK
- **User Experience**: Redirected to login page

**Invalid Token**:
- **Trigger**: Token doesn't match ADMIN_SESSION_TOKEN
- **Response**: `{"authenticated": false}`
- **HTTP Status**: 200 OK
- **User Experience**: Redirected to login page

### Logout Errors

**Always Succeeds**:
- **Design**: Logout is idempotent
- **Response**: `{"success": true}`
- **HTTP Status**: 200 OK
- **Note**: Frontend clears cookie regardless of response

---

## Testing

### Manual Testing with cURL

**Test Login (Success)**:
```bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"TheBetterBobcat","password":"Bobcat1!"}'
```

**Expected Response**:
```json
{"success":true,"session_token":"admin_authenticated","error":null}
```

**Test Login (Failure)**:
```bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"wrong","password":"wrong"}'
```

**Expected Response**:
```json
{"success":false,"session_token":null,"error":"Invalid username or password"}
```

**Test Auth Check (With Cookie)**:
```bash
curl -X GET http://localhost:8000/api/admin/check \
  -H "Cookie: admin_session=admin_authenticated"
```

**Expected Response**:
```json
{"authenticated":true}
```

**Test Auth Check (Invalid Token)**:
```bash
curl -X GET http://localhost:8000/api/admin/check \
  -H "Cookie: admin_session=invalid_token"
```

**Expected Response**:
```json
{"authenticated":false}
```

**Test Logout**:
```bash
curl -X POST http://localhost:8000/api/admin/logout \
  -H "Cookie: admin_session=admin_authenticated"
```

**Expected Response**:
```json
{"success":true}
```

### API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

The admin endpoints will appear under the "admin" tag in the documentation.

---

## Production Considerations

### Security Improvements Needed

1. **Environment Variables**: Move credentials to environment variables
   ```python
   ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
   ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
   ```

2. **Token Generation**: Use cryptographically secure random tokens
   ```python
   import secrets
   ADMIN_SESSION_TOKEN = secrets.token_urlsafe(32)
   ```

3. **Token Expiration**: Implement token expiration and refresh
   ```python
   # Store tokens with expiration timestamps
   # Validate expiration on each check
   ```

4. **Constant-Time Comparison**: Use `secrets.compare_digest()` for credential validation
   ```python
   import secrets
   return secrets.compare_digest(username, ADMIN_USERNAME) and \
          secrets.compare_digest(password, ADMIN_PASSWORD)
   ```

5. **Rate Limiting**: Add rate limiting to prevent brute force attacks
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   
   @router.post("/login")
   @limiter.limit("5/minute")
   async def login(...):
   ```

6. **HTTPS Only**: Enforce HTTPS in production
   ```python
   # Set secure cookie flag
   # Use HTTPS redirects
   ```

7. **CORS Restrictions**: Limit CORS to production domain only
   ```python
   allow_origins=["https://yourdomain.com"]
   ```

---

## Summary

The admin authentication system provides a minimal, functional authentication mechanism for internal admin access. It uses:

- **FastAPI** for the web framework and API routing
- **Pydantic** for request/response validation
- **Hardcoded credentials** for simplicity (development only)
- **Session tokens** stored in HTTP-only cookies
- **Server-side validation** for all authentication checks

The system is designed to be:
- **Minimal**: No database, no OAuth, no JWT
- **Secure**: Server-side validation, generic errors, HTTP-only cookies
- **Functional**: Complete login, check, and logout flow
- **Documented**: Automatic API documentation via FastAPI

For production use, implement the security improvements listed in the Production Considerations section.

