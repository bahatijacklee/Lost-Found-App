import React, { useState } from 'react';
import { User, Mail, Calendar, Package, Eye, Edit, Trash2 } from 'lucide-react';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { ItemCard } from '../components/Items/ItemCard';
import { ItemModal } from '../components/Items/ItemModal';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../hooks/useItems';
import { Item } from '../types';

export function Profile() {
  const { user } = useAuth();
  const { items } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('my-items');

  const myItems = items.filter(item => item.userId === user?.id);
  const lostItems = myItems.filter(item => item.type === 'lost');
  const foundItems = myItems.filter(item => item.type === 'found');
  const claimedItems = myItems.filter(item => item.status === 'claimed');

  const handleViewItem = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const stats = [
    {
      name: 'Total Items',
      value: myItems.length,
      color: 'text-primary-600 bg-primary-100',
    },
    {
      name: 'Lost Items',
      value: lostItems.length,
      color: 'text-red-600 bg-red-100',
    },
    {
      name: 'Found Items',
      value: foundItems.length,
      color: 'text-green-600 bg-green-100',
    },
    {
      name: 'Items Claimed',
      value: claimedItems.length,
      color: 'text-blue-600 bg-blue-100',
    },
  ];

  const tabs = [
    { id: 'my-items', name: 'My Items', count: myItems.length },
    { id: 'lost', name: 'Lost Items', count: lostItems.length },
    { id: 'found', name: 'Found Items', count: foundItems.length },
  ];

  const getItemsForTab = () => {
    switch (activeTab) {
      case 'lost':
        return lostItems;
      case 'found':
        return foundItems;
      default:
        return myItems;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-teal-600 px-6 py-8">
            <div className="flex items-center space-x-6">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="h-10 w-10 text-primary-600" />
                </div>
              )}
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {new Date(user?.createdAt || '').toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge variant="info" className="mt-3">
                  {user?.role === 'admin' ? 'Administrator' : 'Student'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.color} mb-2`}>
                  <Package className="h-6 w-6" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Items Grid */}
          <div className="p-6">
            {getItemsForTab().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getItemsForTab().map((item) => (
                  <div key={item.id} className="relative group">
                    <ItemCard
                      item={item}
                      onViewDetails={handleViewItem}
                      showActions={false}
                    />
                    {/* Item Actions Overlay */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                          title="Edit Item"
                        >
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab === 'lost' ? 'lost' : activeTab === 'found' ? 'found' : ''} items yet
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'lost' 
                    ? "You haven't reported any lost items yet."
                    : activeTab === 'found'
                    ? "You haven't reported any found items yet."
                    : "You haven't reported any items yet."
                  }
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/report'}>
                  Report an Item
                </Button>
              </div>
            )}
          </div>
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