import { NavLink } from 'react-router-dom';
import styles from './Link.module.css';

export function Link({ children, text, to }: { children: string; text: string; to: '/login' | '/register' }) {
  return (
    <p className={styles.linkWrapper}>
      {text}&nbsp;
      <NavLink className={styles.link} to={to}>
        {children}
      </NavLink>
    </p>
  );
}
