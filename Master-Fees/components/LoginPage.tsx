import { useState } from 'react';
import { toast } from "sonner";
import { api } from "../utils/supabase/api";

interface LoginPageProps {
  onLogin: (schoolId: string, schoolName: string, accessToken: string, keepLoggedIn: boolean) => void;
  onSignup: () => void;
  onForgotPassword: () => void;
}

export default function LoginPage({ onLogin, onSignup, onForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.signIn(email, password);
      
      if (response.success && response.data) {
        const { schoolId, schoolName, accessToken } = response.data;
        toast.success(`Welcome to ${schoolName}!`);
        onLogin(schoolId, schoolName, accessToken, keepLoggedIn);
      } else {
        toast.error(response.error || 'Invalid email or password. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Unable to connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 bg-[#2a3441] flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="text-left mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 mr-3">
                <svg viewBox="0 0 32 32" className="w-full h-full text-[#5DFCAF]">
                  <path fill="currentColor" d="M16 2L2 8v8c0 8.84 5.96 17.16 14 19 8.04-1.84 14-10.16 14-19V8L16 2z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Master-Fees</h1>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              Secure, reliable, and comprehensive financial management for educational institutions
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your school email address"
                  className="w-full px-4 py-3 bg-[#1a2332] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#5DFCAF] focus:ring-1 focus:ring-[#5DFCAF] transition-colors"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-[#1a2332] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#5DFCAF] focus:ring-1 focus:ring-[#5DFCAF] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="keep-logged-in"
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="h-4 w-4 text-[#5DFCAF] focus:ring-[#5DFCAF] border-gray-600 rounded bg-[#1a2332]"
                />
                <label htmlFor="keep-logged-in" className="ml-2 block text-sm text-gray-300">
                  Keep me logged in
                </label>
              </div>

              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[#5DFCAF] hover:text-[#4de69a] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#1a2332] bg-[#5DFCAF] hover:bg-[#4de69a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5DFCAF] focus:ring-offset-[#1a2332] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1a2332]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>

            <div className="text-center">
              <span className="text-gray-400 text-sm">New to Master-Fees?</span>
            </div>

            <button
              type="button"
              onClick={onSignup}
              className="w-full flex justify-center py-3 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-white bg-transparent hover:bg-[#1a2332] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-[#2a3441] transition-colors"
            >
              Create School Account
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="flex-1 bg-white p-12 flex items-center justify-center">
        <div className="max-w-lg">
          {/* Logo Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-[#2a3441] transform rotate-45 flex items-center justify-center relative">
              <div className="w-16 h-16 bg-[#5DFCAF] transform -rotate-45 absolute"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Streamline Your School's Financial Management
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-[#5DFCAF] rounded-full flex items-center justify-center mt-0.5 mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-lg">Real-time fee tracking and payment monitoring</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-[#5DFCAF] rounded-full flex items-center justify-center mt-0.5 mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-lg">Comprehensive student and parent management</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-[#5DFCAF] rounded-full flex items-center justify-center mt-0.5 mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-lg">Automated reports and financial analytics</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-[#5DFCAF] rounded-full flex items-center justify-center mt-0.5 mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-lg">QuickBooks integration for seamless accounting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}