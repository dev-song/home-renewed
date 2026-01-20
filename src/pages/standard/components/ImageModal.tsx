import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  altText?: string;
}

export default function ImageModal({ isOpen, imageUrl, onClose, altText }: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300'
      onClick={onClose}
    >
      <div className='relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors z-50 pointer-events-auto'
          aria-label='Close modal'
        >
          <X className='w-6 h-6' />
        </button>
        <img
          src={imageUrl}
          alt={altText || 'Expanded project image'}
          className='max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto'
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
