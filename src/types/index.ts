export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  location: string;
  status: 'upcoming' | 'completed';
  cover_image_url?: string;
  created_at: string;
}

export interface EventRegistration {
  id?: string;
  event_id: string;
  full_name: string;
  email: string;
  phone?: string;
  school_or_org?: string;
  message?: string;
  created_at?: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  program_name: string;
  location: string;
  participants_count: number;
  schools_count: number;
  funding_source?: string;
  cover_image_url?: string;
  published: boolean;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  type: 'blog' | 'download' | 'policy' | 'guide';
  description: string;
  file_url?: string;
  body?: string;
  published: boolean;
  created_at: string;
}

export interface Inquiry {
  id?: string;
  inquiry_type: 'volunteer' | 'partner' | 'contact' | 'donor';
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
  created_at?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  visible: boolean;
}

export interface Subscription {
  id?: string;
  email: string;
  created_at?: string;
}

export interface Award {
  id: string;
  verification_code: string;
  recipient_name: string;
  award_title: string;
  category: 'academic' | 'leadership' | 'community' | 'innovation';
  issue_date: string;
  institution?: string;
  description?: string;
  verification_status: 'verified' | 'revoked' | 'pending';
  created_at: string;
}
