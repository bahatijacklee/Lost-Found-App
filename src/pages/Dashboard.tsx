import React, { useState } from 'react';
import { Plus, Search, TrendingUp, Users, Package, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import { ItemCard } from '../components/Items/ItemCard';
import { ItemModal } from '../components/Items/ItemModal';
import { useItems } from '../hooks/useItems';
import { Item } from '../types';

export function Dashboard() {
  const { items } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);

  const recentItems = items.slice(0, 6);
  const myItems = items.filter(item => item.userId === '1'); // Current user items
  
  const stats = [
    {
      name: 'Total Items',
      value: items.length,
      icon: Package,
      color: 'text-primary-600 bg-primary-100',
      change: '+12%',
    },
    {
      name: 'Items Found',
      value: items.filter(item => item.type === 'found').length,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100',
      change: '+18%',
    },
    {
      name: 'Active Users',
      value: '1.2k',
      icon: Users,
      color: 'text-teal-600 bg-teal-100',
      change: '+8%',
    },
    {
      name: 'This Week',
      value: items.filter(item => {
        const itemDate = new Date(item.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return itemDate > weekAgo;
      }).length,
      icon: Clock,
      color: 'text-orange-600 bg-orange-100',
      change: '+24%',
    },
  ];

  const handleViewItem = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening on campus.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link to="/search" className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search Items
              </Link>
            </Button>
            <Button asChild>
              <Link to="/report" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Report Item
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last week</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-primary-600 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Lost something important?</h2>
              <p className="text-primary-100">
                Report it now and let our community help you find it. The sooner you report, 
                the better your chances of recovery.
              </p>
            </div>
            <div className="flex space-x-3 flex-shrink-0">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/report">
                  Report Lost Item
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Items */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Items</h2>
            <Button variant="ghost" asChild>
              <Link to="/search" className="flex items-center">
                View all
                <Eye className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onViewDetails={handleViewItem}
              />
            ))}
          </div>
        </div>

        {/* My Items */}
        {myItems.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Items</h2>
              <Button variant="ghost" asChild>
                <Link to="/profile" className="flex items-center">
                  Manage all
                  <Eye className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.slice(0, 3).map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onViewDetails={handleViewItem}
                />
              ))}
            </div>
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