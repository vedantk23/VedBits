import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, Shield, Calculator } from 'lucide-react'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  captcha: z.string().min(1, 'Please solve the math problem'),
})

const Auth: React.FC = () => {
  const { signIn, user, loading } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0)
  
  // Mathematical captcha state
  const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0, answer: 0 })
  const [captchaError, setCaptchaError] = useState('')

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(signInSchema)
  })

  // Generate new captcha question
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const answer = num1 + num2
    setCaptchaQuestion({ num1, num2, answer })
    setCaptchaError('')
    setValue('captcha', '') // Clear captcha input
  }

  // Initialize captcha on component mount
  React.useEffect(() => {
    generateCaptcha()
  }, [])

  // Rate limiting logic
  React.useEffect(() => {
    const storedAttempts = localStorage.getItem('signin_attempts')
    const storedBlockTime = localStorage.getItem('signin_block_time')
    
    if (storedAttempts) {
      setAttemptCount(parseInt(storedAttempts))
    }
    
    if (storedBlockTime) {
      const blockTime = parseInt(storedBlockTime)
      const now = Date.now()
      
      if (now < blockTime) {
        setIsBlocked(true)
        setBlockTimeRemaining(Math.ceil((blockTime - now) / 1000))
        
        const interval = setInterval(() => {
          const remaining = Math.ceil((blockTime - Date.now()) / 1000)
          if (remaining <= 0) {
            setIsBlocked(false)
            setBlockTimeRemaining(0)
            setAttemptCount(0)
            localStorage.removeItem('signin_attempts')
            localStorage.removeItem('signin_block_time')
            clearInterval(interval)
            generateCaptcha() // Generate new captcha when unblocked
          } else {
            setBlockTimeRemaining(remaining)
          }
        }, 1000)
        
        return () => clearInterval(interval)
      } else {
        // Block time has expired
        setAttemptCount(0)
        localStorage.removeItem('signin_attempts')
        localStorage.removeItem('signin_block_time')
      }
    }
  }, [])

  // Redirect if already authenticated
  if (!loading && user) {
    return <Navigate to="/admin" replace />
  }

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  const onSubmit = async (data: any) => {
    // Check if user is blocked
    if (isBlocked) {
      toast.error(`Account blocked for 24 hours. Try again in ${formatTime(blockTimeRemaining)}.`)
      return
    }

    // Verify captcha
    const userAnswer = parseInt(data.captcha)
    if (userAnswer !== captchaQuestion.answer) {
      setCaptchaError('Incorrect answer. Please try again.')
      generateCaptcha() // Generate new captcha on wrong answer
      return
    }

    setIsSigningIn(true)
    try {
      await signIn(data.email, data.password)
      toast.success('Successfully signed in!')
      // Reset attempts on successful login
      setAttemptCount(0)
      localStorage.removeItem('signin_attempts')
      localStorage.removeItem('signin_block_time')
      navigate('/admin')
    } catch (error: any) {
      // Increment attempt count on failed login
      const newAttemptCount = attemptCount + 1
      setAttemptCount(newAttemptCount)
      localStorage.setItem('signin_attempts', newAttemptCount.toString())
      
      // Block user after 2 failed attempts for 24 hours
      if (newAttemptCount >= 2) {
        const blockTime = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        localStorage.setItem('signin_block_time', blockTime.toString())
        setIsBlocked(true)
        setBlockTimeRemaining(24 * 60 * 60)
        toast.error('Account blocked for 24 hours due to multiple failed login attempts.')
      } else {
        const remainingAttempts = 2 - newAttemptCount
        toast.error(`Invalid credentials. ${remainingAttempts} attempt remaining before 24-hour block.`)
      }
      
      // Generate new captcha after failed attempt
      generateCaptcha()
      
      toast.error(error.message || 'Invalid credentials')
    } finally {
      setIsSigningIn(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    } else {
      return `${remainingSeconds}s`
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
          {/* Rate limiting warning */}
          {attemptCount > 0 && !isBlocked && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-800">Security Warning</p>
                  <p className="text-xs text-red-600 mt-1">
                    {attemptCount === 1 && 'Invalid login attempt. 1 attempt remaining before 24-hour block.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Block notification */}
          {isBlocked && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-800">Account Blocked</p>
                  <p className="text-xs text-red-600 mt-1">
                    Multiple failed login attempts detected. Account blocked for 24 hours.
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Time remaining: {formatTime(blockTimeRemaining)}
                  </p>
                </div>
              </div>
            </div>
          )}

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
                  disabled={isBlocked}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  disabled={isBlocked}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isBlocked}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Mathematical Captcha */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Security Verification
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 mb-3">
                <div className="flex items-center justify-center space-x-3">
                  <Calculator className="h-5 w-5 text-gray-600" />
                  <span className="text-lg font-mono font-medium text-gray-800">
                    {captchaQuestion.num1} + {captchaQuestion.num2} = ?
                  </span>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    disabled={isBlocked}
                    className="text-blue-600 hover:text-blue-800 text-sm underline disabled:cursor-not-allowed disabled:text-gray-400"
                  >
                    New Question
                  </button>
                </div>
              </div>
              <input
                {...register('captcha')}
                type="number"
                disabled={isBlocked}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter the answer"
              />
              {(errors.captcha || captchaError) && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {errors.captcha?.message || captchaError}
                </p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isSigningIn || isBlocked}
              className="w-full btn-primary py-3 sm:py-4 text-sm sm:text-base lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBlocked ? `Blocked (${formatTime(blockTimeRemaining)})` : isSigningIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 font-light text-center">
              Only authorized administrators can access this panel
            </p>
            <p className="text-xs text-gray-400 font-light text-center mt-2">
              Maximum 2 login attempts • 24-hour block after failed attempts
            </p>
            <p className="text-xs text-gray-400 font-light text-center mt-1">
              Mathematical verification required for enhanced security
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth