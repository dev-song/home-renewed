import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export const MEDIA_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const;
type MediaType = (typeof MEDIA_TYPE)[keyof typeof MEDIA_TYPE];

export interface MediaItem {
  type: MediaType;
  url: string;
  thumbnail?: string;
  alt?: string;
}

interface MediaModalProps {
  media: MediaItem;
  onClose: () => void;
}

export default function MediaModal({ media, onClose }: MediaModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => onClose();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'z-50 flex items-center justify-center max-w-none max-h-none m-auto p-0 border-0 bg-transparent transition-all',
        'backdrop:bg-black/80 backdrop:backdrop-blur-sm focus:outline-none',
      )}
      onClick={closeModal}
      onClose={closeModal}
    >
      <CloseButton onClick={onClose} className='absolute top-4 right-4' aria-label='Close modal' />

      {media.type === MEDIA_TYPE.VIDEO ? (
        <Video src={media.url} poster={media.thumbnail} />
      ) : (
        <Image src={media.url} alt={media.alt || 'Expanded project image'} />
      )}
    </dialog>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function CloseButton({ className, ...props }: CloseButtonProps) {
  return (
    <button
      className={cn(
        'z-50 p-2 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors cursor-pointer',
        className,
      )}
      {...props}
    >
      <X className='w-6 h-6' />
    </button>
  );
}

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement>;

function Video({ className, ...props }: VideoProps) {
  return (
    <video
      className={cn(
        'min-w-4/5 min-h-4/5 max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl focus:outline-none',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      preload='metadata'
      controls
      autoPlay
      muted
      playsInline
      {...props}
    />
  );
}

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

function Image({ className, ...props }: ImageProps) {
  return (
    <img
      className={cn('max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl', className)}
      onClick={(e) => e.stopPropagation()}
      loading='lazy'
      {...props}
    />
  );
}
