import { useEffect, useState } from 'react';
import styles from './ImageModal.module.css';
import { Button } from '../../../univComponents/Button/Button';
import type { ImageModalProps } from '../../Main.interfaces';
import { Carousel } from 'react-responsive-carousel';

const animationTime = 500;

export function ImageModal({ images, startIndex, onClose }: ImageModalProps) {
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    setOpening(true);
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, animationTime);
  };

  return (
    <div
      className={`${styles.modal_overlay} ${closing ? styles.closing : ''} ${opening ? styles.opening : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.starry_background}></div>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <Carousel
          selectedItem={startIndex}
          showArrows
          showIndicators={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows
          autoPlay={true}
          stopOnHover
          swipeable
          showThumbs={false}
        >
          {images.map((image) => (
            <div key={image.url} className="styles.image_container">
              <img src={image.url} alt={image.label} className="styles.enlarged_image" />
            </div>
          ))}
        </Carousel>
        <Button onClick={handleClose} type="button">
          Закрыть
        </Button>
      </div>
    </div>
  );
}
