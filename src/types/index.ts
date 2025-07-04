export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  photoUrl?: string;
  status: 'pending' | 'verified' | 'claimed';
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  itemId: string;
  message: string;
  type: 'match' | 'claim' | 'verification';
  status: 'unread' | 'read';
  createdAt: string;
}

export interface SearchFilters {
  type?: 'lost' | 'found' | 'all';
  category?: string;
  location?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: 'pending' | 'verified' | 'claimed' | 'all';
}