import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

interface MediaModalProps {
  isOpen: boolean;
  media: MediaItem | null;
  onClose: () => void;
}

export default function MediaModal({ isOpen, media, onClose }: MediaModalProps) {
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

  const handleClose = () => {
    onClose();
  };

  if (!media) return null;

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

        {media.type === 'video' ? (
          <video
            src={media.url}
            controls
            autoPlay
            className='min-w-4/5 min-h-4/5 max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl focus:outline-none'
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={media.url}
            alt={media.alt || 'Expanded project image'}
            className='max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </dialog>
  );
}
