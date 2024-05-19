import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo_white.png';
import styles from './Logo.module.css';
import type { ToggleMenuProps } from '../Header.interfaces';

export function Logo({ toggleMenuOpen }: ToggleMenuProps) {
  return (
    <NavLink to={`/`} onClick={toggleMenuOpen}>
      <img src={logo} alt={'Logo'} className={styles.logo} />
    </NavLink>
  );
}
