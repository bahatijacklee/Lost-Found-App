import React, { useState } from 'react';
import { Upload, Camera, MapPin, Calendar } from 'lucide-react';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Select } from '../components/UI/Select';
import { useItems } from '../hooks/useItems';
import { Item } from '../types';

const categories = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Personal Items', label: 'Personal Items' },
  { value: 'Books', label: 'Books & Stationery' },
  { value: 'Clothing', label: 'Clothing & Accessories' },
  { value: 'Sports', label: 'Sports Equipment' },
  { value: 'Other', label: 'Other' },
];

const locations = [
  { value: 'Central Library', label: 'Central Library' },
  { value: 'Student Union', label: 'Student Union' },
  { value: 'Recreation Center', label: 'Recreation Center' },
  { value: 'Engineering Building', label: 'Engineering Building' },
  { value: 'Science Building', label: 'Science Building' },
  { value: 'Cafeteria', label: 'Cafeteria' },
  { value: 'Dormitory', label: 'Dormitory' },
  { value: 'Parking Lot', label: 'Parking Lot' },
];

export function Report() {
  const { addItem, isLoading } = useItems();
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const itemData: Omit<Item, 'id' | 'userId' | 'user' | 'createdAt' | 'updatedAt'> = {
        type,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        date: formData.date,
        status: 'pending',
        photoUrl: photoPreview || undefined,
      };

      await addItem(itemData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
      });
      setPhoto(null);
      setPhotoPreview('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting item:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report an Item</h1>
          <p className="text-gray-600">
            Help build our community by reporting lost or found items. 
            The more details you provide, the better we can help reunite items with their owners.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg animate-slide-up">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Item reported successfully!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your item has been submitted for review. Once approved by our admin team, 
                    it will be visible to other users. You'll receive notifications about any potential matches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Type Selection */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Item Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === 'lost'
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">😞</div>
                  <h3 className="font-semibold">I Lost Something</h3>
                  <p className="text-sm mt-1">Report an item you've lost</p>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setType('found')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === 'found'
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎉</div>
                  <h3 className="font-semibold">I Found Something</h3>
                  <p className="text-sm mt-1">Report an item you've found</p>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <Input
                label="Item Title"
                placeholder="e.g., MacBook Pro 13-inch, Blue Water Bottle, Black Wallet"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                helperText="Be specific but concise"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors sm:text-sm"
                  rows={4}
                  placeholder="Provide a detailed description including color, size, brand, distinctive features, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Include as many details as possible to help with identification
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  options={[{ value: '', label: 'Select a category' }, ...categories]}
                  required
                />

                <Select
                  label="Location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  options={[{ value: '', label: 'Select a location' }, ...locations]}
                  required
                />
              </div>

              <Input
                type="date"
                label={type === 'lost' ? 'Date Lost' : 'Date Found'}
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Photo (Optional)</h3>
              <p className="text-sm text-gray-600">
                Adding a photo significantly increases the chances of successful identification
              </p>

              <div className="space-y-4">
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null);
                        setPhotoPreview('');
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <span className="sr-only">Remove photo</span>
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="photo-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload a photo</span>
                          <input
                            id="photo-upload"
                            name="photo-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                type="submit"
                isLoading={isLoading}
                size="lg"
                className="w-full sm:w-auto"
              >
                {type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Your item will be reviewed by our admin team before being published
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}