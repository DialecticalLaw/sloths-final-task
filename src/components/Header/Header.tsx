import styles from './Header.module.css';
import { Navigation } from './Navigation/Navigation';
import { Logo } from './Logo/Logo';
import { BurgerButton } from './BurgerMenu/BurgerButton/BurgerButton';
import { useState, useEffect } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Logo toggleMenuOpen={toggleMenuOpen} />
      <Navigation menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
      <BurgerButton toggleMenuOpen={toggleMenuOpen} menuOpen={menuOpen} />
    </header>
  );
}
