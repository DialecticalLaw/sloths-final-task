import { useEffect, useState } from 'react';
import styles from './ImageModal.module.css';
import { Button } from '../../../univComponents/Button/Button';
import type { ImageModalProps } from '../../Main.interfaces';

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    setOpening(true);
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div
      className={`${styles.modal_overlay} ${closing ? styles.closing : ''} ${opening ? styles.opening : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.starry_background}></div>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Enlarged" className={styles.enlarged_image} />
        <Button onClick={handleClose} type="button">
          Закрыть
        </Button>
      </div>
    </div>
  );
}
