import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { updateCart } from '../../../../api/cart/updateCart';
import { formatPrice } from '../../../../helpers/formatPrice';
import { Price } from '../../../univComponents/Price/Price';
import styles from './Item.module.css';
import { useAppDispatch } from '../../../../store/hooks';
import { useState } from 'react';
import { Loader } from '../../Loader/Loader';
import { formatForQuantityUpdate } from '../../../../helpers/formatForQuantityUpdate';
import deleteIcon from '../../../../assets/img/delete.svg';
import { productHeaders } from '../../../../helpers/cartConfig';

export function Item({ itemData, cart }: { itemData: LineItem; cart: Cart }) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const price = itemData.price.value.centAmount;
  const discountPrice = itemData.price.discounted?.value.centAmount;
  const bgImageUrl = itemData.variant?.images?.length ? itemData.variant.images[0].url : '';

  const updateQuantity = async (actionName: 'increment' | 'decrement' | 'remove') => {
    setIsUpdating(true);
    try {
      await dispatch(updateCart(formatForQuantityUpdate({ actionName, cart, itemData })));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.product}>
      {isUpdating && <Loader classes={[styles.product_loader]} />}
      <div className={styles.left_line_wrapper}>
        <div className={styles.left_line}></div>
      </div>
      <div className={styles.right_line_wrapper}>
        <div className={styles.right_line}></div>
      </div>

      <button
        onClick={() => updateQuantity('remove')}
        title="Удалить из корзины"
        className={styles.delete_btn}
        type="button"
      >
        <img className={styles.delete_icon} src={deleteIcon} alt="delete" />
      </button>

      <table className={styles.product_table}>
        <thead className={styles.product_head}>
          <tr className={styles.product_props_wrapper}>
            {productHeaders.map((header) => {
              return (
                <th key={header} className={styles.product_prop}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.product_body}>
          <tr className={styles.product_info_wrapper}>
            <td className={styles.product_main_info_cell}>
              <div className={styles.product_image_wrapper}>
                <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
                <div className={styles.product_image_glow_wrapper}>
                  <img src={bgImageUrl} alt="glow" className={styles.product_image_glow} />
                </div>
              </div>
            </td>
            <td>
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
                  type="button"
                  className={styles.decrement}
                  disabled={itemData.quantity < 2}
                  onClick={() => updateQuantity('decrement')}
                >
                  &ndash;
                </button>
                <span className={styles.quantity}>{itemData.quantity}</span>
                <button
                  onClick={() => updateQuantity('increment')}
                  type="button"
                  className={styles.increment}
                >
                  +
                </button>
              </div>
            </td>
            <td>
              <p className={styles.total}>{formatPrice(itemData.totalPrice.centAmount)}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}