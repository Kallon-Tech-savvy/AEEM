export const EVENT_LIST_FIELDS = [
  'id',
  'title',
  'slug',
  'description',
  'event_date',
  'location',
  'status',
  'cover_image_url',
].join(', ')

export const EVENT_DETAIL_FIELDS = [
  'id',
  'title',
  'slug',
  'description',
  'event_date',
  'location',
  'status',
  'cover_image_url',
].join(', ')

export const IMPACT_STORY_LIST_FIELDS = [
  'id',
  'title',
  'slug',
  'summary',
  'location',
  'participants_count',
  'schools_count',
  'cover_image_url',
].join(', ')

export const IMPACT_STORY_DETAIL_FIELDS = [
  'title',
  'summary',
  'coverImage:cover_image_url',
  'file_name',
  'participantsCount:participants_count',
  'schoolsCount:schools_count',
  'duration',
  'overview',
  'focusAreas:focus_areas',
  'impact',
  'quoteText:quote_text',
  'quoteAuthor:quote_author',
].join(', ')

export const RESOURCE_LIST_FIELDS = [
  'id',
  'title',
  'slug',
  'type',
  'description',
  'summary',
  'category',
  'created_at',
  'tags',
  'image:image_url',
].join(', ')

export const RESOURCE_DETAIL_FIELDS = [
  'title',
  'slug',
  'type',
  'description',
  'summary',
  'body',
  'fullBody:full_body',
  'file_url',
  'category',
  'created_at',
  'readingTime:reading_time',
  'tags',
  'image:image_url',
  'bulletPoints:bullet_points',
].join(', ')
