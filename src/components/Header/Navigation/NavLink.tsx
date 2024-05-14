import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
export function CustomNavLink({
  text,
  to
}: {
  text: string;
  to: '/login' | '/register' | '/catalog' | '/about' | '/';
}) {
  const location = useLocation();
  return (
    <NavLink
      className={({ isActive }) => (isActive ? styles.active : styles.nav_link)}
      to={to}
      state={{ from: location }}
    >
      {text}
    </NavLink>
  );
}
