import type { LineItem } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../../store/hooks';
import styles from './Cart.module.css';
import { Price } from '../../univComponents/Price/Price';
import { formatPrice } from '../../../helpers/formatPrice';

export function Cart() {
  const cart = useAppSelector((state) => state.cart_slice.cart);
  console.log(cart?.lineItems);

  return (
    <section>
      <h1 className={styles.title}>Корзина</h1>
      {cart ? (
        <div className={styles.products_wrapper}>
          {cart.lineItems.map((item: LineItem, index) => {
            const price = item.price.value.centAmount;
            const discountPrice = item.price.discounted?.value.centAmount;
            const bgImageUrl = item.variant?.images?.length ? item.variant.images[0].url : '';

            return (
              <table className={styles.product} key={index}>
                <thead>
                  <tr>
                    <th className={styles.product_prop}>Продукт</th>
                    <th className={styles.product_prop}>Цена</th>
                    <th className={styles.product_prop}>Количество</th>
                    <th className={styles.product_prop}>Итого</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.product_main_info_cell}>
                      <div className={styles.product_image_wrapper}>
                        <div
                          className={styles.product_image}
                          style={{ backgroundImage: `url(${bgImageUrl})` }}
                        />
                        <div className={styles.product_image_glow_wrapper}>
                          <img src={bgImageUrl} alt="glow" className={styles.product_image_glow} />
                        </div>
                      </div>
                      <p className={`${styles.product_name} ${discountPrice && styles.discount_name}`}>
                        {item.name.ru}
                      </p>
                    </td>
                    <td>
                      <Price
                        classes={[styles.product_price_wrapper]}
                        price={price}
                        discountPrice={discountPrice}
                      />
                    </td>
                    <td>+ 1 -</td>
                    <td>
                      <p className={styles.total}>
                        Итого: {formatPrice(item.quantity * (discountPrice || price))}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      ) : (
        <p>Корзина пуста... Но космос бесконечен, и так же бесконечны возможности для покупок!</p>
      )}
    </section>
  );
}
