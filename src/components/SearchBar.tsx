import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    
    // Update URL as user types (debounced effect would be better in production)
    if (location.pathname === '/') {
      if (value.trim()) {
        navigate(`/?search=${encodeURIComponent(value.trim())}`, { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }

  // Update search query from URL params
  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const searchParam = params.get('search')
    if (searchParam) {
      setSearchQuery(searchParam)
    } else {
      setSearchQuery('')
    }
  }, [location.search])

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full sm:w-48 lg:w-64 pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent font-light text-sm text-gray-900 placeholder-gray-600 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/30"
      />
    </form>
  )
}

export default SearchBar