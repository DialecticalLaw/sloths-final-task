import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo_white.png';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <NavLink to={`/`} className={styles.logo_link}>
      <img src={logo} alt={'Logo'} className={styles.logo} />
    </NavLink>
  );
}
