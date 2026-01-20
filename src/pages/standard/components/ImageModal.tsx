import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  altText?: string;
}

export default function ImageModal({ isOpen, imageUrl, onClose, altText }: ImageModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (dialog && e.target === dialog) {
      onClose();
    }
  };

  // Handle native close event (e.g. Escape key)
  const handleClose = () => {
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className='bg-transparent p-0 border-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm m-auto max-w-none max-h-none w-full h-full inset-0 z-50 transition-all focus:outline-none'
      onClick={handleBackdropClick}
      onClose={handleClose}
    >
      <div className='relative w-full h-full flex items-center justify-center p-4'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors z-50 cursor-pointer'
          aria-label='Close modal'
        >
          <X className='w-6 h-6' />
        </button>
        <img
          src={imageUrl}
          alt={altText || 'Expanded project image'}
          className='max-w-[95vw] max-h-[95vh] object-contain rounded-lg'
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </dialog>
  );
}
