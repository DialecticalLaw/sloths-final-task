import styles from './BurgerButton.module.css';
import visible from './../../../../assets/img/visible.svg';
import noVisible from './../../../../assets/img/noVisible.svg';
import type { BurgerButtonProps } from '../../Header.interfaces';

export const BurgerButton = ({ toggleMenuOpen, menuOpen }: BurgerButtonProps) => {
  return (
    <button type="button" onClick={toggleMenuOpen} className={styles.burger_button}>
      <img src={menuOpen ? visible : noVisible} alt="burger menu" />
    </button>
  );
};
