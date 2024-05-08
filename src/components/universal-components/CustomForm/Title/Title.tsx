import styles from './Title.module.css';
import logo from '../../../../assets/img/logo_white.png';

export function Title({ children }: { children: string }) {
  return (
    <>
      <img className={styles.logo} src={logo} alt="logo" />
      <h2 className={styles.titleAddition}>Welcome to the future</h2>
      <h1 className={styles.titleMain}>{children}</h1>
    </>
  );
}
