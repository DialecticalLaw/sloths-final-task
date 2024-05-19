import styles from './Header.module.css';
import { Navigation } from './Navigation/Navigation';
import { Logo } from './Logo/Logo';
import { BurgerButton } from './BurgerMenu/BurgerButton/BurgerButton';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <Logo toggleMenuOpen={toggleMenuOpen} />
      <Navigation menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
      <BurgerButton toggleMenuOpen={toggleMenuOpen} menuOpen={menuOpen} />
    </header>
  );
}
