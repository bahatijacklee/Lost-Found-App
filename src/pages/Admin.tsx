import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Clock, Users, Package, TrendingUp, Search, Filter } from 'lucide-react';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Select } from '../components/UI/Select';
import { Badge } from '../components/UI/Badge';
import { ItemCard } from '../components/Items/ItemCard';
import { ItemModal } from '../components/Items/ItemModal';
import { useItems } from '../hooks/useItems';
import { useAuth } from '../context/AuthContext';
import { Item } from '../types';

const statusOptions = [
  { value: 'all', label: 'All Items' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'verified', label: 'Verified' },
  { value: 'claimed', label: 'Claimed' },
];

export function Admin() {
  const { user } = useAuth();
  const { items, updateItemStatus } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingItems = items.filter(item => item.status === 'pending');
  const verifiedItems = items.filter(item => item.status === 'verified');
  const claimedItems = items.filter(item => item.status === 'claimed');

  const handleApprove = async (itemId: string) => {
    await updateItemStatus(itemId, 'verified');
  };

  const handleReject = async (itemId: string) => {
    // In a real app, you might want to add a rejection reason
    // For now, we'll just remove it or mark it as rejected
    console.log('Rejecting item:', itemId);
  };

  const handleViewItem = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const stats = [
    {
      name: 'Pending Review',
      value: pendingItems.length,
      icon: Clock,
      color: 'text-orange-600 bg-orange-100',
      urgent: pendingItems.length > 5,
    },
    {
      name: 'Verified Items',
      value: verifiedItems.length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
    },
    {
      name: 'Items Claimed',
      value: claimedItems.length,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      name: 'Total Users',
      value: '1.2k',
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage and verify lost & found items across campus.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
                stat.urgent ? 'ring-2 ring-orange-200' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  {stat.urgent && (
                    <p className="text-sm text-orange-600 mt-1 font-medium">Needs attention</p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions for Pending Items */}
        {pendingItems.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-900">
                    {pendingItems.length} Items Awaiting Review
                  </h3>
                  <p className="text-orange-700">
                    These items need your approval before being visible to users.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setStatusFilter('pending')}
                variant="secondary"
              >
                Review Now
              </Button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search items by title, description, or user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={statusOptions}
              />
            </div>
          </div>
        </div>

        {/* Items List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {statusFilter === 'all' ? 'All Items' : 
               statusFilter === 'pending' ? 'Pending Review' :
               statusFilter === 'verified' ? 'Verified Items' : 'Claimed Items'}
            </h2>
            <p className="text-gray-600">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Item Preview */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Badge variant={item.type === 'lost' ? 'danger' : 'success'}>
                            {item.type.toUpperCase()}
                          </Badge>
                          <Badge variant={
                            item.status === 'verified' ? 'success' :
                            item.status === 'pending' ? 'warning' : 'info'
                          }>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>📍 {item.location}</span>
                        <span>📅 {new Date(item.date).toLocaleDateString()}</span>
                        <span>🏷️ {item.category}</span>
                        <span>👤 {item.user.name}</span>
                      </div>
                    </div>

                    {/* Item Photo */}
                    {item.photoUrl && (
                      <div className="w-full lg:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.photoUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col space-y-3 lg:w-48 flex-shrink-0">
                      <Button
                        onClick={() => handleViewItem(item)}
                        variant="outline"
                        className="flex items-center justify-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>

                      {item.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleApprove(item.id)}
                            variant="secondary"
                            size="sm"
                            className="flex-1 flex items-center justify-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(item.id)}
                            variant="danger"
                            size="sm"
                            className="flex-1 flex items-center justify-center"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">
                {statusFilter === 'pending' 
                  ? "No items are currently pending review."
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        <ItemModal
          item={selectedItem}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedItem(null);
          }}
        />
      </div>
    </Layout>
  );
}