import styles from './Feedback.module.css';
import { Carousel } from 'react-responsive-carousel';
import slothExpertIcon from '../../../../assets/img/sloth_expert.png';
import { getRatingElems } from '../../../../helpers/getRatingElems';

const feedbackConfig = [
  {
    img: slothExpertIcon,
    name: 'Reviewer 1',
    review: 'Ну, в целом всё хорошо',
    rating: 1
  },
  {
    img: 'd',
    name: 'Test',
    review: 'Отзыв',
    rating: 3
  }
];

export function Feedback() {
  return (
    <Carousel
      className={styles.carousel}
      showArrows
      showIndicators={false}
      centerMode
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      stopOnHover
      swipeable
      showThumbs={false}
    >
      {feedbackConfig.map((feedback) => {
        return (
          <div key={feedback.name} className={styles.feedback}>
            <div className={styles.avatar} style={{ backgroundImage: `url(${feedback.img})` }} />
            <p className={styles.text}>{feedback.review}</p>
            <div className={styles.rating}>
              {...getRatingElems({ rating: feedback.rating, classes: [styles.star] })}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
