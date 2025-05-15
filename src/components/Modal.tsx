// Modal.tsx
import React, { useEffect, useRef } from 'react';
import { XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}) => {
  const { darkMode } = useAppContext();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className={`w-full ${sizeClasses[size]} ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } rounded-lg shadow-xl overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={`px-6 py-4 flex items-center justify-between ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } border-b`}>
          <h3 id="modal-title" className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className={`p-1 rounded-full ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
            }`}
          >
            <XCircle size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
        <div className={`px-6 py-4 ${
          darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
        } border-t flex justify-end gap-3`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;