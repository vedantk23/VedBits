import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { PenTool, Eye, Edit2, Trash2, Plus, Calendar, BarChart3, FileText, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface Post {
  id: string
  title: string
  body: string
  footer: string
  view_count: number
  slug: string
  created_at: string
  updated_at: string
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'created_at' | 'view_count' | 'title'>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Show loading while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  useEffect(() => {
    fetchPosts()
  }, [user, navigate, sortBy, sortOrder])

  // Redirect to signin if not authenticated (after loading is complete)
  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin')
    }
  }, [user, loading, navigate])

  const fetchPosts = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy, { ascending: sortOrder === 'asc' })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) throw error
      
      toast.success('Post deleted successfully')
      await fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const totalViews = posts.reduce((sum, post) => sum + post.view_count, 0)

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-4">
          Admin Dashboard
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-light">
          Manage your blog posts and track engagement metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        <div className="card p-4 sm:p-6 lg:p-8 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Total Posts</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mt-1 sm:mt-2">{posts.length}</p>
            </div>
            <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6 lg:p-8 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Total Views</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mt-1 sm:mt-2">{totalViews.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Eye className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6 lg:p-8 hover-lift sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Avg Views/Post</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mt-1 sm:mt-2">
                {posts.length > 0 ? Math.round(totalViews / posts.length) : 0}
              </p>
            </div>
            <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Sorting */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900">Blog Posts</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="created_at">Date Created</option>
              <option value="view_count">View Count</option>
              <option value="title">Title</option>
            </select>
            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
        
        <Link
          to="/admin/create"
          className="btn-primary flex items-center space-x-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="card p-8 sm:p-12 lg:p-16 text-center">
          <PenTool className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-400 mx-auto mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900 mb-2 sm:mb-4">
            No posts yet
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-light mb-6 sm:mb-8">
            Create your first blog post to get started.
          </p>
          <Link
            to="/admin/create"
            className="btn-primary inline-flex items-center space-x-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            <PenTool className="h-4 w-4" />
            <span>Create Your First Post</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {posts.map((post, index) => (
            <div key={post.id} className="card p-4 sm:p-6 hover-lift">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2 sm:mb-3 hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                  
                  {/* Meta information */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-500 mb-3 lg:mb-0">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-light">{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span className="font-light">{post.view_count.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 mt-3 lg:mt-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="btn-secondary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    title="View post"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">View</span>
                  </Link>
                  <Link
                    to={`/admin/edit/${post.id}`}
                    className="btn-secondary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    title="Edit post"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="btn-secondary flex items-center space-x-1 sm:space-x-2 hover:bg-red-50 hover:text-red-600 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    title="Delete post"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard