export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  property_type: string;
  listing_type: string;
  image_url: string;
  gallery: string[] | null;
  featured: boolean;
  amenities: string[] | null;
  created_at: string;
}

export interface Agent {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  image_url: string;
  social: Record<string, string> | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  image_url: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}
