export interface Project {
  id: string;
  title: string;
  youtubeUrl: string;
  embedUrl: string;
  thumbnail: string;
  category: string;
  videoType: 'Short Form' | 'Long Form' | 'Commercial' | 'Educational' | 'Brand Content' | string;
  description: string;
  client: string;
  duration: string;
  uploadDate: string;
  views: string;
  likes: string;
  tags: string[];
  featured: boolean;
  metrics: {
    retention?: string;
    engagement?: string;
    watchTime?: string;
  };
  overview: string;
  challenge: string;
  strategy: string;
  style: string;
  tools: string[];
  results: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  tag: string;
  testimonial: string;
}
