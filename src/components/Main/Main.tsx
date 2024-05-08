import { Register } from './Register/Register';
import styles from './Main.module.css';

export function Main() {
  return (
    <main className={styles.main}>
      <Register />
    </main>
  );
}
