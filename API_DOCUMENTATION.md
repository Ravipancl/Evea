# 🔐 Evea Authentication API Documentation

## 🚀 **Base URL**
```
http://localhost:3000
```

## 📋 **Available Endpoints**

### **1. User Registration**
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",  // Optional
  "password": "password123",
  "userData": {            // Optional
    "full_name": "John Doe",
    "company": "Example Corp"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "phone": "+1234567890",
      "created_at": "2025-08-07T15:02:00Z",
      "email_confirmed_at": null,
      "phone_confirmed_at": null
    },
    "session": null,
    "requiresVerification": true
  }
}
```

---

### **2. User Login**
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",  // Use either email or phone
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "phone": "+1234567890",
      "created_at": "2025-08-07T15:02:00Z",
      "email_confirmed_at": "2025-08-07T15:05:00Z",
      "phone_confirmed_at": null,
      "user_metadata": {}
    },
    "session": {
      "access_token": "eyJ...",
      "refresh_token": "eyJ...",
      "expires_at": 1234567890
    }
  }
}
```

---

### **3. User Logout**
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### **4. Google OAuth**
**POST** `/api/auth/google`

**Request Body:**
```json
{
  "redirectTo": "http://localhost:3000/auth/callback"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Google OAuth URL generated",
  "data": {
    "url": "https://supabase.co/auth/v1/authorize?...",
    "provider": "google"
  }
}
```

---

### **5. Email Verification**
**POST** `/api/auth/verify-email`

**Request Body:**
```json
{
  "email": "user@example.com",
  "token": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "email_confirmed_at": "2025-08-07T15:05:00Z"
    },
    "session": {
      "access_token": "eyJ...",
      "refresh_token": "eyJ...",
      "expires_at": 1234567890
    }
  }
}
```

---

### **6. Phone Verification**
**POST** `/api/auth/verify-phone`

**Request Body:**
```json
{
  "phone": "+1234567890",
  "token": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Phone verified successfully",
  "data": {
    "user": {
      "id": "user-uuid",
      "phone": "+1234567890",
      "phone_confirmed_at": "2025-08-07T15:05:00Z"
    },
    "session": {
      "access_token": "eyJ...",
      "refresh_token": "eyJ...",
      "expires_at": 1234567890
    }
  }
}
```

---

### **7. Password Reset**
**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent successfully",
  "data": {
    "email": "user@example.com"
  }
}
```

---

### **8. Get User Profile**
**GET** `/api/user/profile`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "phone": "+1234567890",
      "created_at": "2025-08-07T15:02:00Z",
      "updated_at": "2025-08-07T15:05:00Z",
      "user_metadata": {
        "full_name": "John Doe",
        "company": "Example Corp"
      }
    }
  }
}
```

---

### **9. Update User Profile**
**PUT** `/api/user/profile`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "phone": "+1987654321",
  "user_metadata": {
    "full_name": "John Smith",
    "company": "New Corp"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "newemail@example.com",
      "phone": "+1987654321",
      "updated_at": "2025-08-07T15:10:00Z"
    }
  }
}
```

---

### **10. Email Verification Callback**
**GET** `/auth/callback?code=VERIFICATION_CODE`

**Response:** Redirects to your application after email verification

---

## 🧪 **Testing with Postman**

### **1. User Registration**
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "userData": {
    "full_name": "Test User"
  }
}
```

### **2. User Login**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### **3. Get User Profile**
```
GET http://localhost:3000/api/user/profile
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🔒 **Error Responses**

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### **Common Error Codes:**
- `MISSING_IDENTIFIER` - Email or phone required
- `MISSING_PASSWORD` - Password required
- `WEAK_PASSWORD` - Password too short
- `INVALID_EMAIL` - Invalid email format
- `INVALID_PHONE` - Invalid phone format
- `MISSING_CREDENTIALS` - Login credentials missing
- `LOGIN_FAILED` - Authentication failed
- `REGISTRATION_FAILED` - Registration failed
- `VERIFICATION_FAILED` - OTP verification failed
- `PASSWORD_RESET_FAILED` - Password reset failed
- `GOOGLE_OAUTH_FAILED` - Google OAuth failed
- `INTERNAL_ERROR` - Server error

---

## 🚀 **Environment Variables**

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📱 **Features Supported**

### **✅ Authentication Methods:**
- Email/Password registration and login
- Phone/Password registration and login
- Google OAuth integration
- Email verification with OTP
- Phone verification with SMS OTP
- Password reset via email

### **✅ Security Features:**
- Input validation and sanitization
- Password strength requirements
- Email format validation
- Phone format validation
- JWT token management
- Session management

### **✅ User Management:**
- User profile retrieval
- User profile updates
- User metadata support
- Account verification status

---

## 🎯 **Ready for Integration**

This backend API is ready to be integrated into any frontend application or used as a microservice in a larger system. All endpoints follow RESTful conventions and return consistent JSON responses. 