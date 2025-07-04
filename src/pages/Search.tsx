import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '../components/Layout/Layout';
import { Input } from '../components/UI/Input';
import { Select } from '../components/UI/Select';
import { Button } from '../components/UI/Button';
import { ItemCard } from '../components/Items/ItemCard';
import { ItemModal } from '../components/Items/ItemModal';
import { useItems } from '../hooks/useItems';
import { Item, SearchFilters } from '../types';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Personal Items', label: 'Personal Items' },
  { value: 'Books', label: 'Books & Stationery' },
  { value: 'Clothing', label: 'Clothing & Accessories' },
  { value: 'Sports', label: 'Sports Equipment' },
  { value: 'Other', label: 'Other' },
];

const locations = [
  { value: '', label: 'All Locations' },
  { value: 'Central Library', label: 'Central Library' },
  { value: 'Student Union', label: 'Student Union' },
  { value: 'Recreation Center', label: 'Recreation Center' },
  { value: 'Engineering Building', label: 'Engineering Building' },
  { value: 'Science Building', label: 'Science Building' },
  { value: 'Cafeteria', label: 'Cafeteria' },
  { value: 'Dormitory', label: 'Dormitory' },
  { value: 'Parking Lot', label: 'Parking Lot' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'verified', label: 'Verified' },
  { value: 'pending', label: 'Pending' },
  { value: 'claimed', label: 'Claimed' },
];

const typeOptions = [
  { value: 'all', label: 'All Items' },
  { value: 'lost', label: 'Lost Items' },
  { value: 'found', label: 'Found Items' },
];

export function Search() {
  const { items } = useItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    category: '',
    location: '',
    status: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDescription = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesDescription && !matchesCategory && !matchesLocation) {
          return false;
        }
      }

      // Type filter
      if (filters.type && filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }

      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status && filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      category: '',
      location: '',
      status: 'all',
    });
    setSearchQuery('');
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'all' && value !== ''
  ).length + (searchQuery ? 1 : 0);

  const handleViewItem = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Items</h1>
          <p className="text-gray-600">
            Find lost items or browse found items to help reunite them with their owners.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by title, description, category, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
              <Select
                label="Type"
                value={filters.type || 'all'}
                onChange={(e) => handleFilterChange('type', e.target.value as any)}
                options={typeOptions}
              />
              
              <Select
                label="Category"
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                options={categories}
              />
              
              <Select
                label="Location"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                options={locations}
              />
              
              <Select
                label="Status"
                value={filters.status || 'all'}
                onChange={(e) => handleFilterChange('status', e.target.value as any)}
                options={statusOptions}
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <span className="font-semibold">{filteredItems.length}</span>{' '}
              {filteredItems.length === 1 ? 'item' : 'items'} found
            </p>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onViewDetails={handleViewItem}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Modal */}
        <ItemModal
          item={selectedItem}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedItem(null);
          }}
          onClaim={(item) => {
            console.log('Claiming item:', item);
            setShowModal(false);
            setSelectedItem(null);
          }}
        />
      </div>
    </Layout>
  );
}