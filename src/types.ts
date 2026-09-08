export type ProjectCategory = 'wedding' | 'commercial' | 'corporate' | 'event' | 'content';

export interface Project {
  id: string;
  filterKey: ProjectCategory;
  category: string;
  name: string;
  desc: string;
  tags: string[];
  bg: string;
  image: string;
  video: string;
  isPortrait?: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: string; // e.g. 'all' | 'beards' | 'hairstyle' | 'haircut' | 'mustaches' | 'portrait' | 'new'
  imageUrl: string;
  description?: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
  createdAt?: string;
  isCustom?: boolean;
}

export interface Service {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

