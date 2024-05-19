import visible from './../../../../assets/img/visible.svg';
import noVisible from './../../../../assets/img/noVisible.svg';
import styles from './BurgerButton.module.css';

interface BurgerButtonProps {
  toggleMenuOpen: () => void;
  menuOpen: boolean;
}

export const BurgerButton = ({ toggleMenuOpen, menuOpen }: BurgerButtonProps) => {
  return (
    <button type="button" onClick={toggleMenuOpen} className={styles.burger_button}>
      <img src={menuOpen ? visible : noVisible} alt="burger menu" />
    </button>
  );
};
