import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Eye, Edit2, Trash2 } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import MarkdownRenderer from '../components/MarkdownRenderer'
import toast from 'react-hot-toast'

interface Post {
  id: string
  title: string
  body: string
  footer: string
  view_count: number
  slug: string
  created_at: string
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewIncremented, setViewIncremented] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error
      setPost(data)

      // Increment view count only once per session
      if (data && !viewIncremented) {
        await incrementViewCount(data.slug)
        setViewIncremented(true)
        // Update local state to reflect the increment
        setPost(prev => prev ? { ...prev, view_count: prev.view_count + 1 } : null)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  const incrementViewCount = async (postSlug: string) => {
    try {
      await supabase.rpc('increment_view_count', { post_slug: postSlug })
    } catch (error) {
      console.error('Error incrementing view count:', error)
    }
  }

  const handleDelete = async () => {
    if (!post || !user) return

    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id)

      if (error) throw error
      
      toast.success('Post deleted successfully')
      navigate('/admin')
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
      <article>
        {/* Header */}
        <div className="pb-6 sm:pb-8 border-b border-gray-200 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 flex-1 sm:mr-4 leading-tight mb-4 sm:mb-0">
              {post.title}
            </h1>
            
            {/* Admin Controls - Only visible to authenticated users */}
            {user && (
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                <Link
                  to={`/admin/edit/${post.id}`}
                  className="btn-secondary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4 py-2"
                  title="Edit post"
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn-secondary flex items-center space-x-1 sm:space-x-2 hover:bg-red-50 hover:text-red-600 text-xs sm:text-sm px-2 sm:px-4 py-2"
                  title="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="font-light">{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="font-light">{post.view_count} views</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8 sm:mb-12">
          <MarkdownRenderer source={post.body} />
        </div>

        {/* Share Section */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200">
          <ShareButtons 
            title={post.title}
            url={`/blog/${post.slug}`}
          />
        </div>
      </article>
    </div>
  )
}

export default BlogPost