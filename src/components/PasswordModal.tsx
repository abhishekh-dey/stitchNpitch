import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: 'pass' | 'fail') => void;
  guideName: string;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  guideName
}) => {
  const [password, setPassword] = useState('');
  const [selectedAction, setSelectedAction] = useState<'pass' | 'fail' | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAction) {
      setError('Please select Selected or Not Selected');
      return;
    }
    if (!password.trim()) {
      setError('Please enter the password');
      return;
    }
    
    onConfirm(selectedAction);
    setPassword('');
    setSelectedAction(null);
    setError('');
  };

  const handleClose = () => {
    setPassword('');
    setSelectedAction(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-900" />
            <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Mark <span className="font-semibold text-blue-900">{guideName}</span> as:
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setSelectedAction('pass')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedAction === 'pass'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              ✅ Selected (Winner)
            </button>
            <button
              type="button"
              onClick={() => setSelectedAction('fail')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedAction === 'fail'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-100'
              }`}
            >
              ❌ Not Selected
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;