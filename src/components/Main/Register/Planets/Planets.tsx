import { Field } from 'formik';
import styles from './Planets.module.css';

export function Planets({ name }: { name: string }) {
  return (
    <>
      <h2 className={styles.title}>Select a planet</h2>
      <div className={styles.planets}>
        <Field className={`${styles.planet} ${styles.venus}`} type="radio" name={name} value="venus" />
        <Field className={`${styles.planet} ${styles.earth}`} type="radio" name={name} value="earth" />
        <Field className={`${styles.planet} ${styles.mars}`} type="radio" name={name} value="mars" />
      </div>
    </>
  );
}
