import React, { useState } from 'react';
import { Trophy, Home, History, Trash2, X, AlertTriangle } from 'lucide-react';
import { PURGE_PASSWORD } from '../config/data';

interface NavigationProps {
  currentTab: 'selection' | 'winners';
  onTabChange: (tab: 'selection' | 'winners') => void;
  onPurgeWinners: () => void;
  winnerCount: number;
}

interface PurgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PurgeModal: React.FC<PurgeModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PURGE_PASSWORD) {
      onConfirm();
      setPassword('');
      setError('');
    } else {
      setError('Invalid password. Access denied.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Confirm Purge</h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This action will permanently delete all winners from the database. This cannot be undone.
          </p>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="nav-purge-password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="nav-purge-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter admin password"
            />
            
            {error && (
              <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Purge All Winners
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  onPurgeWinners,
  winnerCount
}) => {
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);

  const handlePurgeClick = () => {
    setIsPurgeModalOpen(true);
  };

  const handlePurgeConfirm = () => {
    onPurgeWinners();
    setIsPurgeModalOpen(false);
  };

  const handleLogoClick = () => {
    onTabChange('selection');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Clickable */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <img 
                  src="/stitch-n-pitch-logo.png" 
                  alt="Stitch n Pitch Logo" 
                  className="h-12 w-12 rounded-full object-cover drop-shadow-lg border-2 border-white border-opacity-30"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">Stitch n Pitch Portal</h1>
              </div>
            </button>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onTabChange('selection')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentTab === 'selection'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Selection</span>
              </button>

              <button
                onClick={() => onTabChange('winners')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all relative ${
                  currentTab === 'winners'
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Winners</span>
                {winnerCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {winnerCount}
                  </span>
                )}
              </button>

              {/* Purge Button - Only show in winners tab */}
              {currentTab === 'winners' && winnerCount > 0 && (
                <button
                  onClick={handlePurgeClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-300 hover:text-white hover:bg-red-600 transition-all"
                  title="Purge all winners"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Purge</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Purge Modal */}
      <PurgeModal
        isOpen={isPurgeModalOpen}
        onClose={() => setIsPurgeModalOpen(false)}
        onConfirm={handlePurgeConfirm}
      />
    </>
  );
};

export default Navigation;