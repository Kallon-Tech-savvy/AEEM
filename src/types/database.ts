/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * Database contract consumed by the typed Supabase client.
 *
 * The public Row surface is verified in CI against:
 *   supabase gen types typescript --local --schema public
 *
 * Keep this file aligned with the migration history. Do not add frontend-only
 * view models here; define those in src/types/content.ts or at the feature
 * boundary that consumes them.
 */
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
      inquiry_rate_limits: {
        Row: {
          key_hash: string
          window_started_at: string
          request_count: number
        }
        Insert: {
          key_hash: string
          window_started_at?: string
          request_count?: number
        }
        Update: {
          key_hash?: string
          window_started_at?: string
          request_count?: number
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
    Functions: {
      cleanup_inquiry_rate_limits: {
        Args: {
          p_max_age_seconds?: number
        }
        Returns: number
      }
      consume_inquiry_rate_limit: {
        Args: {
          p_key_hash: string
          p_window_seconds?: number
          p_limit?: number
        }
        Returns: boolean
      }
    }
    Enums: {}
    CompositeTypes: {}
  }
}
