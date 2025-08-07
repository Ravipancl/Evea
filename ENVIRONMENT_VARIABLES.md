# 🔧 Environment Variables Guide

## 📋 **Complete List of Environment Variables**

### **1. Supabase Configuration (REQUIRED)**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find:**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select existing
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon public** key

---

### **2. Google OAuth Configuration (OPTIONAL - for Google sign-in)**

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Where to find:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth 2.0 Client ID**
6. Set application type to **Web application**
7. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)
8. Copy **Client ID** and **Client Secret**

---

### **3. Twilio Configuration (OPTIONAL - for SMS OTP)**

```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

**Where to find:**
1. Go to [Twilio Console](https://console.twilio.com)
2. Sign up for a free account
3. Go to **Dashboard**
4. Copy **Account SID** and **Auth Token**
5. Go to **Phone Numbers** → **Manage** → **Active numbers**
6. Buy a phone number or use your existing one

---

### **4. Email Configuration (OPTIONAL - for custom email service)**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Where to find:**
1. For Gmail:
   - Go to [Google Account Settings](https://myaccount.google.com)
   - **Security** → **2-Step Verification** → **App passwords**
   - Generate app password for your app
2. For other providers, check their SMTP settings

---

### **5. App Configuration (OPTIONAL)**

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-key
```

**Where to find:**
- `NEXT_PUBLIC_APP_URL`: Your app's base URL
- `JWT_SECRET`: Generate a random string (32+ characters)

---

### **6. Development Configuration (OPTIONAL)**

```env
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
```

---

## 🚀 **Step-by-Step Setup Guide**

### **Step 1: Supabase Setup (REQUIRED)**

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Click **New Project**
   - Enter project name and database password
   - Wait for project to be ready

2. **Get API Keys:**
   - Go to **Settings** → **API**
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Configure Authentication:**
   - Go to **Authentication** → **Settings**
   - Enable **Email confirmations**
   - Enable **Phone confirmations** (if using SMS)

### **Step 2: Google OAuth Setup (OPTIONAL)**

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable **Google+ API**

2. **Create OAuth Credentials:**
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: Your app name
   - Authorized redirect URIs:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     http://localhost:3000/auth/callback
     ```

3. **Configure in Supabase:**
   - Go to Supabase **Authentication** → **Providers**
   - Enable **Google**
   - Add **Client ID** and **Client Secret**

### **Step 3: Twilio Setup (OPTIONAL - for SMS)**

1. **Create Twilio Account:**
   - Go to [twilio.com](https://twilio.com)
   - Sign up for free account
   - Verify your phone number

2. **Get Credentials:**
   - Go to **Console Dashboard**
   - Copy **Account SID** and **Auth Token**
   - Buy a phone number or use existing

3. **Configure in Supabase:**
   - Go to **Authentication** → **Settings**
   - Configure SMS provider with Twilio credentials

---

## 📁 **Complete .env.local File**

```env
# =============================================================================
# SUPABASE CONFIGURATION (REQUIRED)
# =============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# =============================================================================
# GOOGLE OAUTH CONFIGURATION (OPTIONAL)
# =============================================================================
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# =============================================================================
# TWILIO CONFIGURATION (OPTIONAL)
# =============================================================================
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# =============================================================================
# EMAIL CONFIGURATION (OPTIONAL)
# =============================================================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# =============================================================================
# APP CONFIGURATION (OPTIONAL)
# =============================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-key

# =============================================================================
# DEVELOPMENT CONFIGURATION (OPTIONAL)
# =============================================================================
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
```

---

## 🔒 **Security Best Practices**

### **Required Variables (Minimum Setup):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### **Production Environment:**
- Use different Supabase project for production
- Set `NODE_ENV=production`
- Remove debug variables
- Use strong JWT secrets

### **Security Notes:**
- ✅ Never commit `.env.local` to version control
- ✅ Use different keys for development and production
- ✅ Rotate secrets regularly
- ✅ Use environment-specific configurations

---

## 🧪 **Testing Your Setup**

1. **Create `.env.local`** with your Supabase credentials
2. **Restart development server:**
   ```bash
   npm run dev
   ```
3. **Test authentication flows:**
   - Email signup/signin
   - Phone signup/signin (if configured)
   - Google OAuth (if configured)

---

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"Missing Supabase environment variables"**
   - Check `.env.local` file exists
   - Verify variable names are correct
   - Restart development server

2. **"Google OAuth not working"**
   - Verify redirect URIs in Google Cloud Console
   - Check Supabase Google provider configuration
   - Ensure HTTPS in production

3. **"SMS not sending"**
   - Verify Twilio credentials
   - Check phone number format
   - Ensure sufficient Twilio credits

---

## 📞 **Support Resources**

- **Supabase Docs:** https://supabase.com/docs
- **Google Cloud Console:** https://console.cloud.google.com
- **Twilio Docs:** https://www.twilio.com/docs
- **Next.js Environment Variables:** https://nextjs.org/docs/basic-features/environment-variables

Your authentication system is ready to go! 🎉 