import React, { useState } from 'react';
import { User, Mail, Bell, Shield, Save, Camera, Eye, EyeOff } from 'lucide-react';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useAuth } from '../context/AuthContext';

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailMatches: true,
    emailClaims: true,
    emailUpdates: false,
    pushNotifications: true,
    smsNotifications: false,
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Admin settings (only for admins)
  const [adminSettings, setAdminSettings] = useState({
    autoApproval: false,
    requirePhotos: true,
    maxItemsPerUser: 10,
    itemExpiryDays: 90,
  });

  const handleProfileSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess('Profile updated successfully!');
    setIsLoading(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleNotificationSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess('Notification preferences saved!');
    setIsLoading(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handlePasswordChange = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess('Password changed successfully!');
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsLoading(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleAdminSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess('Admin settings updated!');
    setIsLoading(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    ...(user?.role === 'admin' ? [{ id: 'admin', name: 'Admin', icon: Shield }] : []),
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and application settings.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-slide-up">
            <p className="text-green-800">{success}</p>
          </div>
        )}

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
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                  
                  {/* Avatar */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      {profileData.avatar ? (
                        <img
                          src={profileData.avatar}
                          alt="Profile"
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-20 w-20 bg-primary-600 rounded-full flex items-center justify-center">
                          <User className="h-10 w-10 text-white" />
                        </div>
                      )}
                      <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50">
                        <Camera className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Profile Photo</h4>
                      <p className="text-sm text-gray-600">Update your profile picture</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      helperText="Your university email address"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleProfileSave}
                    isLoading={isLoading}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <p className="text-gray-600 mb-6">
                    Choose how you want to be notified about activity on your items and potential matches.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Email for Matches</h4>
                        <p className="text-sm text-gray-600">Get notified when we find potential matches for your items</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailMatches}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailMatches: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Email for Claims</h4>
                        <p className="text-sm text-gray-600">Get notified when someone claims your found items</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailClaims}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailClaims: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">System Updates</h4>
                        <p className="text-sm text-gray-600">Receive updates about new features and system maintenance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailUpdates}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailUpdates: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleNotificationSave}
                    isLoading={isLoading}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                  <p className="text-gray-600 mb-6">
                    Update your password to keep your account secure.
                  </p>

                  <div className="space-y-4 max-w-md">
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        label="Current Password"
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        label="New Password"
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                        helperText="Must be at least 8 characters long"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm New Password"
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        error={securityData.confirmPassword && securityData.newPassword !== securityData.confirmPassword ? 'Passwords do not match' : ''}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handlePasswordChange}
                    isLoading={isLoading}
                    disabled={!securityData.currentPassword || !securityData.newPassword || securityData.newPassword !== securityData.confirmPassword}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            )}

            {/* Admin Tab */}
            {activeTab === 'admin' && user?.role === 'admin' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h3>
                  <p className="text-gray-600 mb-6">
                    Configure system-wide settings for the Lost & Found platform.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Auto-approve Items</h4>
                        <p className="text-sm text-gray-600">Automatically approve new item submissions without manual review</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={adminSettings.autoApproval}
                          onChange={(e) => setAdminSettings(prev => ({ ...prev, autoApproval: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Require Photos</h4>
                        <p className="text-sm text-gray-600">Make photo uploads mandatory for all item submissions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={adminSettings.requirePhotos}
                          onChange={(e) => setAdminSettings(prev => ({ ...prev, requirePhotos: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="number"
                        label="Max Items Per User"
                        value={adminSettings.maxItemsPerUser}
                        onChange={(e) => setAdminSettings(prev => ({ ...prev, maxItemsPerUser: parseInt(e.target.value) }))}
                        helperText="Maximum number of active items per user"
                      />
                      <Input
                        type="number"
                        label="Item Expiry (Days)"
                        value={adminSettings.itemExpiryDays}
                        onChange={(e) => setAdminSettings(prev => ({ ...prev, itemExpiryDays: parseInt(e.target.value) }))}
                        helperText="Days after which unclaimed items expire"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleAdminSave}
                    isLoading={isLoading}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Admin Settings
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}