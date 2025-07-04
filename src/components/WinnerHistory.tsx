import React, { useState } from 'react';
import { Trophy, Calendar, User, Building, UserCheck, Trash2, AlertTriangle, X } from 'lucide-react';
import { Winner, PURGE_PASSWORD, ADMIN_PASSWORD } from '../config/data';

interface WinnerHistoryProps {
  winners: Winner[];
  onPurgeWinners: () => void;
  onDeleteWinner?: (winnerId: string) => void;
}

interface PurgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  winnerName: string;
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
            <label htmlFor="purge-password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="purge-password"
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

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, winnerName }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">Delete Winner</h2>
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
            Are you sure you want to delete <span className="font-semibold">{winnerName}</span> from the winners list? This action cannot be undone.
          </p>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="delete-password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="delete-password"
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
                Delete Winner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const WinnerHistory: React.FC<WinnerHistoryProps> = ({ winners, onPurgeWinners, onDeleteWinner }) => {
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    winnerId: string | null;
    winnerName: string;
  }>({
    isOpen: false,
    winnerId: null,
    winnerName: ''
  });

  const handlePurgeConfirm = () => {
    onPurgeWinners();
    setIsPurgeModalOpen(false);
  };

  const handleDeleteClick = (winner: Winner) => {
    setDeleteModalState({
      isOpen: true,
      winnerId: winner.id || '',
      winnerName: winner.name
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModalState.winnerId && onDeleteWinner) {
      onDeleteWinner(deleteModalState.winnerId);
    }
    setDeleteModalState({
      isOpen: false,
      winnerId: null,
      winnerName: ''
    });
  };

  const handleDeleteModalClose = () => {
    setDeleteModalState({
      isOpen: false,
      winnerId: null,
      winnerName: ''
    });
  };

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 bg-opacity-30 rounded-full mb-4 backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🏆 Winner History
          </h1>
          <p className="text-xl text-blue-200">
            {winners.length} {winners.length === 1 ? 'Winner' : 'Winners'} Selected So Far
          </p>
        </div>

        {/* Purge Button */}
        {winners.length > 0 && (
          <div className="text-center mb-8">
            <button
              onClick={() => setIsPurgeModalOpen(true)}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              <Trash2 className="w-5 h-5" />
              Purge All Winners
            </button>
          </div>
        )}

        {/* Winners List */}
        {winners.length === 0 ? (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-12 text-center border border-white border-opacity-20">
            <Trophy className="w-16 h-16 text-white opacity-50 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">No Winners Yet</h2>
            <p className="text-blue-200">Start selecting guides to see winners here!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {winners.map((winner, index) => (
              <div
                key={`${winner.id || winner.guide_id}-${winner.timestamp}`}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-xl transform transition-all hover:scale-105 border border-white border-opacity-20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500 bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-yellow-200 font-bold text-lg">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{winner.name}</h3>
                      <div className="flex items-center gap-2 text-blue-200">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(winner.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    {onDeleteWinner && (
                      <button
                        onClick={() => handleDeleteClick(winner)}
                        className="p-2 bg-red-500 bg-opacity-20 text-red-300 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        title="Delete this winner"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <Building className="w-5 h-5 text-blue-300" />
                    <div>
                      <div className="font-medium text-blue-200">Department</div>
                      <div className="text-lg text-white">{winner.department}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <UserCheck className="w-5 h-5 text-green-300" />
                    <div>
                      <div className="font-medium text-blue-200">Supervisor</div>
                      <div className="text-lg text-white">{winner.supervisor}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <PurgeModal
          isOpen={isPurgeModalOpen}
          onClose={() => setIsPurgeModalOpen(false)}
          onConfirm={handlePurgeConfirm}
        />

        <DeleteModal
          isOpen={deleteModalState.isOpen}
          onClose={handleDeleteModalClose}
          onConfirm={handleDeleteConfirm}
          winnerName={deleteModalState.winnerName}
        />
      </div>
    </div>
  );
};

export default WinnerHistory;