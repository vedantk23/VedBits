import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables. Some features may not work.')
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          body: string
          footer: string
          view_count: number
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          body: string
          footer?: string
          view_count?: number
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          body?: string
          footer?: string
          view_count?: number
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      increment_view_count: {
        Args: {
          post_slug: string
        }
        Returns: void
      }
    }
  }
}