import cartIcon from '../../../assets/img/basket.png';
import emptyCartIcon from '../../../assets/img/emptyBasket.png';
import styles from './CartIcon.module.css';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import type { CustomNavLinkProps } from '../Header.interfaces';

export function CartIcon({ toggleMenuOpen }: CustomNavLinkProps) {
  const cart = useAppSelector((state) => state.cart_slice.cart);
  let totalLineItemQuantity;

  if (cart) {
    totalLineItemQuantity = cart.totalLineItemQuantity;
  }

  return (
    <NavLink to={'/cart'} className={styles.cart_link}>
      <img
        src={totalLineItemQuantity ? cartIcon : emptyCartIcon}
        alt="cart icon"
        className={styles.cart_icon}
        onClick={toggleMenuOpen}
      />
      {totalLineItemQuantity && <div className={styles.cart_quantity}>{totalLineItemQuantity}</div>}
    </NavLink>
  );
}
