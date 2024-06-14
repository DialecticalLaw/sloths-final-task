import type { Cart } from '@commercetools/platform-sdk';
import styles from './CartSummary.module.css';
import { formatPrice } from '../../../../helpers/formatPrice';

export function CartSummary({ cart }: { cart: Cart }) {
  return (
    <div className={styles.cart_total}>
      <p>Цена товаров в корзине: {formatPrice(cart.totalPrice.centAmount)}</p>
      <p>Общее количество: {cart.totalLineItemQuantity}</p>
    </div>
  );
}
