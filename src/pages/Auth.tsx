import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const Auth: React.FC = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await signIn(data.email, data.password)
      toast.success('Successfully signed in!')
      navigate('/admin')
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-6 sm:py-12 px-3 sm:px-4 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3">
            Admin Login
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-light">
            Sign in to access VedBits administration
          </p>
        </div>

        <div className="card p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 sm:py-4 text-sm sm:text-base lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 font-light text-center">
              Only authorized administrators can access this panel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth