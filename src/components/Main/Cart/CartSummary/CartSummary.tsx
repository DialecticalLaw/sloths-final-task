import type { Cart } from '@commercetools/platform-sdk';
import styles from './CartSummary.module.css';
import { formatPrice } from '../../../../helpers/formatPrice';
import { Button } from '../../../univComponents/Button/Button';
import voucherIcon from '../../../../assets/img/voucher.svg';
import { useState } from 'react';

export function CartSummary({ cart }: { cart: Cart }) {
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className={styles.cart_total}>
      <p>Цена товаров в корзине: {formatPrice(cart.totalPrice.centAmount)}</p>
      <p>Общее количество: {cart.totalLineItemQuantity}</p>

      <form className={styles.promo_code}>
        <img className={styles.voucher_icon} src={voucherIcon} alt="voucher" />
        <label className={styles.label}>
          <input
            className={styles.input}
            type={'text'}
            placeholder={'Промокод'}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <div className={styles.line} />
        </label>
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log(promoCode);
          }}
          minimal
          type="submit"
        >
          Применить
        </Button>
      </form>
    </div>
  );
}
