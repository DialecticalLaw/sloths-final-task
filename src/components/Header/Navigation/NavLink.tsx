import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
export function CustomNavLink({
  text,
  to,
  src
}: {
  text: string;
  to: '/login' | '/register' | '/catalog' | '/about' | '/' | '/profile';
  src: string;
}) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}
      to={to}
    >
      {text}
      <img className={styles.icon} src={src} alt="icon" />
    </NavLink>
  );
}
