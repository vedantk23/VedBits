import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Calendar, Eye, FileText } from 'lucide-react'

interface Post {
  id: string
  title: string
  body: string
  footer: string
  view_count: number
  slug: string
  created_at: string
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    // Filter posts based on URL search parameter
    const params = new URLSearchParams(location.search)
    const searchQuery = params.get('search')
    
    if (searchQuery) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [posts, location.search])

  const fetchPosts = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
      setFilteredPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getExcerpt = (markdown: string, maxLength: number = 150) => {
    // Strip markdown and get plain text
    const text = markdown
      .replace(/[#*`_~\[\]()]/g, '') // Remove markdown symbols
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove image syntax
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove link syntax
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
    
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const searchQuery = new URLSearchParams(location.search).get('search') || ''

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        searchQuery ? (
          <div className="text-center py-12 sm:py-20">
            <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-light">
              Try searching with different keywords
            </p>
          </div>
        ) : posts.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-2">
            No posts available yet
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-light">
            Check back soon for new content
          </p>
        </div>
        ) : null
      ) : (
        <div className="max-w-4xl mx-auto overflow-x-auto">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-2 gap-4 sm:gap-8 pb-3 mb-6 border-b border-gray-200 min-w-full">
            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Date</div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Title</div>
          </div>
          
          {/* Posts List */}
          {filteredPosts.map((post, index) => (
            <Link
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="block sm:grid sm:grid-cols-2 gap-2 sm:gap-8 py-3 sm:py-4 border-b border-gray-100 hover:bg-gray-50 group"
            >
              <div className="text-xs sm:text-sm text-gray-500 font-light mb-1 sm:mb-0">
                {formatDate(post.created_at)}
              </div>
              <div className="text-sm sm:text-base text-gray-900 font-medium group-hover:text-blue-600 leading-tight">
                {post.title}
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Results count */}
      {searchQuery && filteredPosts.length > 0 && (
        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 font-light">
          Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </div>
      )}
    </div>
  )
}

export default Home