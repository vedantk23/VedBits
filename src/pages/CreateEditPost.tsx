import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Save, ArrowLeft, Eye } from 'lucide-react'
import MarkdownEditor from '../components/MarkdownEditor'
import MarkdownRenderer from '../components/MarkdownRenderer'

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  body: z.string().min(1, 'Content is required'),
})

const CreateEditPost: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [existingPost, setExistingPost] = useState<any>(null)
  const [bodyContent, setBodyContent] = useState('')

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      body: '',
    }
  })

  // Sync bodyContent with form validation
  useEffect(() => {
    setValue('body', bodyContent)
  }, [bodyContent, setValue])

  useEffect(() => {
    if (!user) {
      navigate('/signin')
      return
    }

    if (id) {
      fetchPost()
    }
  }, [user, id, navigate])

  const fetchPost = async () => {
    if (!supabase) {
      navigate('/admin')
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setExistingPost(data)
      setBodyContent(data.body || '')
      
      // Reset form with fetched data
      reset({
        title: data.title,
        body: data.body,
      })
    } catch (error) {
      console.error('Error fetching post:', error)
      toast.error('Failed to load post')
      navigate('/admin')
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const slug = generateSlug(data.title)

      const postData = {
        title: data.title,
        slug,
        body: bodyContent,
        footer: '',
      }

      if (existingPost) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update({
            ...postData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingPost.id)

        if (error) throw error
        toast.success('Post updated successfully!')
      } else {
        // Create new post
        const { error } = await supabase
          .from('posts')
          .insert(postData)

        if (error) throw error
        toast.success('Post created successfully!')
      }

      navigate('/admin')
    } catch (error: any) {
      console.error('Error saving post:', error)
      if (error.message?.includes('duplicate key')) {
        toast.error('A post with this title already exists. Please choose a different title.')
      } else {
        toast.error(error.message || 'Failed to save post')
      }
    } finally {
      setLoading(false)
    }
  }

  const watchedTitle = watch('title')

  if (!user) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="pb-6 sm:pb-8 border-b border-gray-200 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900">
                {existingPost ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setPreview(!preview)}
                className="btn-secondary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                <Eye className="h-4 w-4" />
                <span>{preview ? 'Edit' : 'Preview'}</span>
              </button>
              
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="btn-primary flex items-center space-x-1 sm:space-x-2 disabled:opacity-50 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Post'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {!preview ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 animate-fade-in-up stagger-1">
              <div className="animate-fade-in-up stagger-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Title
                </label>
                <input
                  {...register('title')}
                  placeholder="Enter your post title..."
                  className="w-full text-lg sm:text-2xl lg:text-3xl font-light text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl px-3 sm:px-4 lg:px-6 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {errors.title && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="animate-fade-in-up stagger-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Content (Markdown)
                </label>
                <MarkdownEditor
                  value={bodyContent}
                  onChange={setBodyContent}
                  placeholder="Write your blog post content here using Markdown..."
                  height={window.innerWidth < 640 ? 300 : 400}
                />
                {errors.body && bodyContent.trim() === '' && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">Content is required</p>
                )}
              </div>
            </form>
          ) : (
            <div className="prose prose-lg max-w-none blog-content animate-fade-in">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 mb-6 sm:mb-8">
                {watchedTitle || 'Untitled Post'}
              </h1>
              
              <div className="mb-8 sm:mb-12">
                {bodyContent ? (
                  <MarkdownRenderer source={bodyContent} />
                ) : (
                  <p className="text-gray-400 italic text-sm sm:text-base lg:text-lg">
                    Start writing to see your preview...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Rough Notation Help */}
          {!preview && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-xl animate-fade-in-up stagger-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Rough Notation Syntax</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="space-y-2">
                  <p><code>[highlight]text[/highlight]</code> - Yellow highlight</p>
                  <p><code>[underline]text[/underline]</code> - Blue underline</p>
                  <p><code>[circle]text[/circle]</code> - Red circle</p>
                </div>
                <div className="space-y-2">
                  <p><code>[box]text[/box]</code> - Green box</p>
                  <p><code>[crossed-off]text[/crossed-off]</code> - Gray strikethrough</p>
                  <p><code>[bracket]text[/bracket]</code> - Orange bracket</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 sm:mt-4">
                You can also use regular HTML: <code>&lt;mark&gt;highlighted text&lt;/mark&gt;</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateEditPost