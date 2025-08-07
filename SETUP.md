# Evea - Authentication Setup

## 🚀 Getting Started

### 1. Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Paste them in your `.env.local` file

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🔐 Authentication Features

- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ Email verification (handled by Supabase)
- ✅ User profile display
- ✅ Secure logout
- ✅ Real-time auth state management

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Main page with auth UI
│   └── globals.css         # Global styles
├── components/
│   └── auth/
│       ├── LoginForm.tsx   # Login form component
│       ├── RegisterForm.tsx # Registration form component
│       └── UserProfile.tsx # User profile component
├── contexts/
│   └── AuthContext.tsx     # Authentication context
└── lib/
    └── supabase.ts         # Supabase client configuration
```

## 🛠️ Next Steps

1. **Add more auth providers** (Google, GitHub, etc.)
2. **Create protected routes** using middleware
3. **Add user profile management**
4. **Implement password reset functionality**
5. **Add social login options**

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint 