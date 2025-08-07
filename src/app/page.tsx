

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Evea Authentication API
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Available Endpoints</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Authentication Endpoints</h3>
              <div className="space-y-2 text-sm">
                <div><strong>POST /api/auth/register</strong> - User registration</div>
                <div><strong>POST /api/auth/login</strong> - User login</div>
                <div><strong>POST /api/auth/logout</strong> - User logout</div>
                <div><strong>POST /api/auth/google</strong> - Google OAuth</div>
                <div><strong>POST /api/auth/verify-email</strong> - Email verification</div>
                <div><strong>POST /api/auth/verify-phone</strong> - Phone verification</div>
                <div><strong>POST /api/auth/reset-password</strong> - Password reset</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">User Management Endpoints</h3>
              <div className="space-y-2 text-sm">
                <div><strong>GET /api/user/profile</strong> - Get user profile</div>
                <div><strong>PUT /api/user/profile</strong> - Update user profile</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Callback Endpoints</h3>
              <div className="space-y-2 text-sm">
                <div><strong>GET /auth/callback</strong> - Email verification callback</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Testing with Postman</h3>
            <p className="text-sm text-gray-600">
              Use Postman to test all endpoints. Base URL: <code className="bg-gray-200 px-1 rounded">http://localhost:3000</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
