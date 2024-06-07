import cartIcon from '../../../assets/img/basket.png';
import emptyCartIcon from '../../../assets/img/emptyBasket.png';
import styles from './CartIcon.module.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import type { CustomNavLinkProps } from '../Header.interfaces';
import { useEffect } from 'react';
import { getCart } from '../../../api/cart/createCart';
import { setCart } from '../../../store/slices/cart-slice';

export function CartIcon({ toggleMenuOpen }: CustomNavLinkProps) {
  const cart = useAppSelector((state) => state.cart_slice.cart);
  const customerId = useAppSelector((state) => state.customer_slice.customerId);
  const dispatch = useAppDispatch();

  let totalLineItemQuantity;

  if (cart) {
    totalLineItemQuantity = cart.totalLineItemQuantity;
  }

  useEffect(() => {
    const fetchCart = async () => {
      if (customerId) {
        try {
          const response = await getCart(customerId);
          const cart = response.body;
          dispatch(setCart(cart));
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCart();
  }, [customerId, dispatch]);

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