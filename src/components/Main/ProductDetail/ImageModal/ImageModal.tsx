import { useEffect } from 'react';
import styles from './ImageModal.module.css';
import { Button } from '../../../univComponents/Button/Button';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Enlarged" className={styles.enlarged_image} />
        <Button onClick={onClose} type="button">
          Закрыть
        </Button>
      </div>
    </div>
  );
}
