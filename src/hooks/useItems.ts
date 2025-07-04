import { useState, useEffect } from 'react';
import { Item, SearchFilters } from '../types';

// Mock data for demonstration
const mockItems: Item[] = [
  {
    id: '1',
    type: 'lost',
    title: 'MacBook Pro 13-inch',
    description: 'Silver MacBook Pro with some stickers on the back. Lost in the library on Tuesday.',
    category: 'Electronics',
    location: 'Central Library',
    date: '2024-01-15',
    photoUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'verified',
    userId: '1',
    user: {
      id: '1',
      email: 'john.doe@university.edu',
      name: 'John Doe',
      role: 'user',
      createdAt: '2024-01-15T00:00:00Z',
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    type: 'found',
    title: 'Blue Water Bottle',
    description: 'Stainless steel water bottle with university logo. Found near the gym.',
    category: 'Personal Items',
    location: 'Recreation Center',
    date: '2024-01-14',
    photoUrl: 'https://images.pexels.com/photos/3766227/pexels-photo-3766227.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'verified',
    userId: '2',
    user: {
      id: '2',
      email: 'jane.smith@university.edu',
      name: 'Jane Smith',
      role: 'user',
      createdAt: '2024-01-01T00:00:00Z',
    },
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    type: 'lost',
    title: 'Black Leather Wallet',
    description: 'Black leather wallet containing student ID and some cash. Lost somewhere on campus.',
    category: 'Personal Items',
    location: 'Student Union',
    date: '2024-01-13',
    status: 'verified',
    userId: '3',
    user: {
      id: '3',
      email: 'mike.johnson@university.edu',
      name: 'Mike Johnson',
      role: 'user',
      createdAt: '2024-01-10T00:00:00Z',
    },
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
  },
  {
    id: '4',
    type: 'found',
    title: 'iPhone 14 with Blue Case',
    description: 'Found iPhone with a blue protective case. Screen has a small crack.',
    category: 'Electronics',
    location: 'Engineering Building',
    date: '2024-01-12',
    photoUrl: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'pending',
    userId: '4',
    user: {
      id: '4',
      email: 'admin@university.edu',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
    },
    createdAt: '2024-01-12T11:15:00Z',
    updatedAt: '2024-01-12T11:15:00Z',
  },
];

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 500);
  }, []);

  const addItem = async (itemData: Omit<Item, 'id' | 'userId' | 'user' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItem: Item = {
      ...itemData,
      id: Math.random().toString(36).substr(2, 9),
      userId: '1', // Current user ID
      user: {
        id: '1',
        email: 'john.doe@university.edu',
        name: 'John Doe',
        role: 'user',
        createdAt: '2024-01-15T00:00:00Z',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setItems(prev => [newItem, ...prev]);
    setIsLoading(false);
    
    return newItem;
  };

  const updateItemStatus = async (itemId: string, status: Item['status']) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, status, updatedAt: new Date().toISOString() }
        : item
    ));
  };

  const searchItems = (filters: SearchFilters) => {
    return items.filter(item => {
      if (filters.type && filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.status && filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }
      return true;
    });
  };

  return {
    items,
    isLoading,
    addItem,
    updateItemStatus,
    searchItems,
  };
}