import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, Home, Settings, PenTool } from 'lucide-react'
import SearchBar from './SearchBar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Check if we're on a blog post page
  const isBlogPost = location.pathname.startsWith('/blog/')
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'nav-blur' : 'nav-glass'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-xl sm:text-2xl font-light transition-all duration-300 hover:scale-105 ${
                  isScrolled ? 'text-gray-900' : 'text-gray-900'
                }`}
              >
                VedBits
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Bar */}
              {!isBlogPost && (
              <div className="hidden lg:block">
                <SearchBar />
              </div>
              )}
              
              {user ? (
                <div className="flex items-center space-x-1 sm:space-x-3 animate-fade-in">
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover-lift ${
                      location.pathname.startsWith('/admin')
                        ? 'text-white bg-gray-900/80 backdrop-blur-sm'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/30 backdrop-blur-sm'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin Panel</span>
                    <span className="sm:hidden">Admin</span>
                  </Link>
                  
                  <Link
                    to="/admin/create"
                    className="btn-primary flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-4 py-2"
                  >
                    <PenTool className="h-4 w-4" />
                    <span className="hidden sm:inline">New Post</span>
                    <span className="sm:hidden">New</span>
                  </Link>
                  
                  <button
                    onClick={signOut}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-full hover:bg-white/30 backdrop-blur-sm text-xs sm:text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                null
              )}
            </div>
          </div>
          
          {/* Mobile Search Bar */}
          {!isBlogPost && (
          <div className="lg:hidden px-3 sm:px-4 pb-4 mb-4 border-b border-white/20">
            <SearchBar />
          </div>
          )}
        </div>
      </nav>

      <main className="flex-1 pt-20 sm:pt-20 lg:pt-16">
        {children}
      </main>
    </div>
  )
}

export default Layout