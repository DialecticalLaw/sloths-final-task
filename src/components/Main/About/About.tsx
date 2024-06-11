import styles from './About.module.css';
import spaceman from '../../../assets/img/spaceman.png';

export function About() {
  const astronauts = ['Валерия', 'Денис', 'Наталья'];
  return (
    <section className={styles.bg}>
      <ul className={styles.people}>
        {astronauts.map((astronaut) => {
          return (
            <li className={styles.astronaut} key={astronaut}>
              <img src={spaceman} alt={astronaut} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
