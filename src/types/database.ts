export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          event_date: string
          location: string
          status: 'upcoming' | 'completed'
          cover_image_url: string | null
          file_name: string | null
          duration: string | null
          overview: string | null
          focus_areas: string[]
          impact: string | null
          quote_text: string | null
          quote_author: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          event_date: string
          location: string
          status?: 'upcoming' | 'completed'
          cover_image_url?: string | null
          file_name?: string | null
          duration?: string | null
          overview?: string | null
          focus_areas?: string[]
          impact?: string | null
          quote_text?: string | null
          quote_author?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          event_date?: string
          location?: string
          status?: 'upcoming' | 'completed'
          cover_image_url?: string | null
          file_name?: string | null
          duration?: string | null
          overview?: string | null
          focus_areas?: string[]
          impact?: string | null
          quote_text?: string | null
          quote_author?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          id: string
          title: string
          slug: string
          type: string | null
          category: string | null
          description: string | null
          summary: string | null
          body: string | null
          full_body: string | null
          file_url: string | null
          reading_time: string | null
          tags: string[]
          image_url: string | null
          bullet_points: string[]
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          type?: string | null
          category?: string | null
          description?: string | null
          summary?: string | null
          body?: string | null
          full_body?: string | null
          file_url?: string | null
          reading_time?: string | null
          tags?: string[]
          image_url?: string | null
          bullet_points?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          type?: string | null
          category?: string | null
          description?: string | null
          summary?: string | null
          body?: string | null
          full_body?: string | null
          file_url?: string | null
          reading_time?: string | null
          tags?: string[]
          image_url?: string | null
          bullet_points?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      impact_stories: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string
          location: string
          participants_count: number
          schools_count: number
          cover_image_url: string | null
          file_name: string | null
          duration: string | null
          overview: string | null
          focus_areas: string[]
          impact: string | null
          quote_text: string | null
          quote_author: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary: string
          location: string
          participants_count?: number
          schools_count?: number
          cover_image_url?: string | null
          file_name?: string | null
          duration?: string | null
          overview?: string | null
          focus_areas?: string[]
          impact?: string | null
          quote_text?: string | null
          quote_author?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string
          location?: string
          participants_count?: number
          schools_count?: number
          cover_image_url?: string | null
          file_name?: string | null
          duration?: string | null
          overview?: string | null
          focus_areas?: string[]
          impact?: string | null
          quote_text?: string | null
          quote_author?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          id: string
          inquiry_type: 'contact' | 'volunteer' | 'partner' | 'donor'
          full_name: string
          email: string
          email_normalized: string
          phone: string | null
          phone_normalized: string | null
          organization: string | null
          message: string
          submission_key: string
          created_at: string
        }
        Insert: {
          id?: string
          inquiry_type: 'contact' | 'volunteer' | 'partner' | 'donor'
          full_name: string
          email: string
          email_normalized: string
          phone?: string | null
          phone_normalized?: string | null
          organization?: string | null
          message: string
          submission_key: string
          created_at?: string
        }
        Update: {
          id?: string
          inquiry_type?: 'contact' | 'volunteer' | 'partner' | 'donor'
          full_name?: string
          email?: string
          email_normalized?: string
          phone?: string | null
          phone_normalized?: string | null
          organization?: string | null
          message?: string
          submission_key?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {
      event_status: 'upcoming' | 'completed'
      inquiry_type: 'contact' | 'volunteer' | 'partner' | 'donor'
    }
    CompositeTypes: {}
  }
}
