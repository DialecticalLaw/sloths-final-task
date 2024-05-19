import visible from './../../../../assets/img/visible.svg';
import noVisible from './../../../../assets/img/noVisible.svg';
import styles from './BurgerButton.module.css';

// interface ClickHandlerInterface {
//   clickHandler?: (open: boolean) => void;
// }

// export const BurgerCloseBtn = ({ clickHandler }: ClickHandlerInterface) => {
//   return (
//     <button
//       type="button"
//       className="-m-2.5 rounded-md p-2.5 text-secondary"
//       onClick={() => {
//         if (clickHandler === undefined) return;
//         clickHandler(false);
//       }}
//     >
//       <span className="sr-only">Close menu</span>
//       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//     </button>
//   );
// };

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
