import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { updateCart } from '../../../../api/cart/updateCart';
import { formatPrice } from '../../../../helpers/formatPrice';
import { Price } from '../../../univComponents/Price/Price';
import styles from './Item.module.css';
import { useAppDispatch } from '../../../../store/hooks';

export function Item({ itemData, cart }: { itemData: LineItem; cart: Cart }) {
  const dispatch = useAppDispatch();
  const price = itemData.price.value.centAmount;
  const discountPrice = itemData.price.discounted?.value.centAmount;
  const bgImageUrl = itemData.variant?.images?.length ? itemData.variant.images[0].url : '';

  return (
    <table className={styles.product}>
      <thead>
        <tr>
          <th className={styles.product_prop}>Товар</th>
          <th className={styles.product_prop}>Цена</th>
          <th className={styles.product_prop}>Количество</th>
          <th className={styles.product_prop}>Итого</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={styles.product_main_info_cell}>
            <div className={styles.product_image_wrapper}>
              <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
              <div className={styles.product_image_glow_wrapper}>
                <img src={bgImageUrl} alt="glow" className={styles.product_image_glow} />
              </div>
            </div>
            <p className={`${styles.product_name} ${discountPrice && styles.discount_name}`}>
              {itemData.name.ru}
            </p>
          </td>
          <td>
            <Price classes={[styles.product_price_wrapper]} price={price} discountPrice={discountPrice} />
          </td>
          <td>
            <div className={styles.quantity_wrapper}>
              <button
                onClick={() => {
                  dispatch(
                    updateCart({
                      ID: cart.id,
                      version: cart.version,
                      actions: [
                        {
                          action: 'changeLineItemQuantity',
                          lineItemId: itemData.id,
                          quantity: itemData.quantity + 1
                        }
                      ]
                    })
                  );
                }}
                type="button"
                className={styles.increment}
              >
                +
              </button>
              <span className={styles.quantity}>{itemData.quantity}</span>
              <button
                type="button"
                className={styles.decrement}
                disabled={itemData.quantity < 2}
                onClick={() => {
                  dispatch(
                    updateCart({
                      ID: cart.id,
                      version: cart.version,
                      actions: [
                        {
                          action: 'changeLineItemQuantity',
                          lineItemId: itemData.id,
                          quantity: itemData.quantity - 1
                        }
                      ]
                    })
                  );
                }}
              >
                &ndash;
              </button>
            </div>
          </td>
          <td>
            <p className={styles.total}>{formatPrice(itemData.totalPrice.centAmount)}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
