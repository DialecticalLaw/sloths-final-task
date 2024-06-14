import styles from './About.module.css';
import { Carousel } from 'react-responsive-carousel';
import { Modal } from '../../Modal/Modal';
import type { MemberProps } from '../Main.interfaces';

export function Member({ member, onClose }: MemberProps) {
  return (
    <Modal modalCallback={onClose} className={styles.member_modal}>
      <div className={styles.member_info}>
        <Carousel
          showArrows
          showIndicators={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          stopOnHover
          swipeable
          showThumbs={false}
          className={styles.carousel}
        >
          {member.photos.map((photo, index) => (
            <img
              src={photo}
              alt={`${member.name} ${index + 1}`}
              className={styles.member_photo}
              key={index}
            />
          ))}
        </Carousel>
        <h1 className={styles.member_name}>{member.name}</h1>
      </div>
      <div className={styles.desc_wrapper}>
        <div className={styles.member_description}>{member.description}</div>
      </div>
    </Modal>
  );
}
