# Test Authentication Flow

## Backend API Endpoints

### Login Endpoint
- **URL**: `POST /api/auth/login`
- **Body**: 
  ```json
  {
    "UsernameOrEmail": "string",
    "Password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "Status": "Success",
    "Message": "Login successful",
    "Timestamp": "2025-01-27T...",
    "Token": "jwt-token-here",
    "User": {
      "Id": 1,
      "Username": "admin",
      "Email": "admin@example.com",
      "FirstName": "Admin",
      "LastName": "User",
      "PhoneNumber": "0123456789",
      "EmailConfirmed": true,
      "LastLoginAt": "2025-01-27T...",
      "CreatedAt": "2025-01-27T..."
    },
    "Role": "Admin",
    "MenuIds": [1, 2, 3, 4, 5]
  }
  ```

## Frontend Authentication Flow

### 1. Login Process
1. User enters username/password on `/login` page
2. `useAuth.login()` calls backend API
3. On success, stores in localStorage:
   - `auth_user`: User data
   - `auth_token`: JWT token
   - `auth_role`: User role
   - `auth_menu_ids`: Menu permissions

### 2. API Calls
- All API calls now include `Authorization: Bearer {token}` header
- Token is automatically retrieved from localStorage

### 3. Authentication State
- `isAuthenticated`: Computed from user and token presence
- `user`: Current user data
- `token`: JWT token
- `role`: User role
- `menuIds`: Menu permissions

## Test Steps

1. **Start Backend**: Ensure backend is running on `http://localhost:64707`
2. **Start Frontend**: Run `npm run dev` in frontend directory
3. **Test Login**: 
   - Go to `/login`
   - Enter valid username/password
   - Should redirect to `/main/dashboard`
4. **Test API Calls**: 
   - Check browser dev tools for Authorization headers
   - Verify API calls include Bearer token
5. **Test Logout**: 
   - Click logout
   - Should clear localStorage and redirect to login

## Expected Behavior

- ✅ Login with valid credentials should work
- ✅ Token should be stored in localStorage
- ✅ API calls should include Authorization header
- ✅ Logout should clear all auth data
- ✅ Protected routes should redirect to login if not authenticated
