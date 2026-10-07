import type { Database } from './database'

export type EventRow = Database['public']['Tables']['events']['Row']
export type ImpactStoryRow = Database['public']['Tables']['impact_stories']['Row']
export type ResourceRow = Database['public']['Tables']['resources']['Row']

export type EventListItem = Pick<
  EventRow,
  'id' | 'title' | 'slug' | 'description' | 'event_date' | 'location' | 'status' | 'cover_image_url'
>

export type ImpactStoryListItem = Pick<
  ImpactStoryRow,
  'id' | 'title' | 'slug' | 'summary' | 'location' | 'participants_count' | 'schools_count' | 'cover_image_url'
>

export type ResourceListItem = Pick<
  ResourceRow,
  'id' | 'title' | 'slug' | 'type' | 'description' | 'summary' | 'category' | 'created_at' | 'tags' | 'image_url'
>

export type ImpactStoryDetailItem = Pick<
  ImpactStoryRow,
  | 'title'
  | 'summary'
  | 'cover_image_url'
  | 'file_name'
  | 'participants_count'
  | 'schools_count'
  | 'duration'
  | 'overview'
  | 'focus_areas'
  | 'impact'
  | 'quote_text'
  | 'quote_author'
>

export type ResourceDetailItem = Pick<
  ResourceRow,
  | 'title'
  | 'slug'
  | 'type'
  | 'description'
  | 'summary'
  | 'body'
  | 'full_body'
  | 'file_url'
  | 'category'
  | 'created_at'
  | 'reading_time'
  | 'tags'
  | 'image_url'
  | 'bullet_points'
>
