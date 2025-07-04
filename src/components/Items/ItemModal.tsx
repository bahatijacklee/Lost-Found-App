import React from 'react';
import { X, Calendar, MapPin, User, Clock, Mail, Phone } from 'lucide-react';
import { Item } from '../../types';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim?: (item: Item) => void;
}

export function ItemModal({ item, isOpen, onClose, onClaim }: ItemModalProps) {
  if (!isOpen || !item) return null;

  const getStatusVariant = (status: Item['status']) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'claimed': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Badge variant={item.type === 'lost' ? 'danger' : 'success'}>
                {item.type.toUpperCase()}
              </Badge>
              <Badge variant={getStatusVariant(item.status)}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {/* Image */}
            {item.photoUrl && (
              <div className="aspect-video bg-gray-100">
                <img
                  src={item.photoUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {/* Title and Description */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {item.title}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{item.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-medium">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={item.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.name)}&background=3b82f6&color=white`}
                    alt={item.user.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.user.name}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{item.user.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                {item.type === 'found' && item.status === 'verified' && onClaim && (
                  <Button 
                    onClick={() => onClaim(item)}
                    className="flex-1"
                  >
                    This is Mine!
                  </Button>
                )}
                {item.type === 'lost' && item.status === 'verified' && (
                  <Button 
                    variant="secondary"
                    className="flex-1"
                  >
                    I Found This!
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => window.open(`mailto:${item.user.email}`, '_blank')}
                  className="flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}