import React from 'react';
import { Calendar, MapPin, User, Eye } from 'lucide-react';
import { Item } from '../../types';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

interface ItemCardProps {
  item: Item;
  onViewDetails: (item: Item) => void;
  showActions?: boolean;
}

export function ItemCard({ item, onViewDetails, showActions = true }: ItemCardProps) {
  const getStatusVariant = (status: Item['status']) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'claimed': return 'info';
      default: return 'default';
    }
  };

  const getTypeColor = (type: Item['type']) => {
    return type === 'lost' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
      {/* Image */}
      {item.photoUrl && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={item.photoUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={item.type === 'lost' ? 'danger' : 'success'}>
                {item.type.toUpperCase()}
              </Badge>
              <Badge variant={getStatusVariant(item.status)}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{item.category}</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <img
                src={item.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.name)}&background=3b82f6&color=white`}
                alt={item.user.name}
                className="h-6 w-6 rounded-full mr-2"
              />
              <span className="truncate">{item.user.name}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(item)}
              className="flex items-center"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}