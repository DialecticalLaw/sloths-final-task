import type { LineItem } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../../store/hooks';
import styles from './Cart.module.css';
import { Price } from '../../univComponents/Price/Price';
import { formatPrice } from '../../../helpers/formatPrice';
import { Loader } from '../Loader/Loader';

export function Cart() {
  const { cart, isLoading, errorMessage } = useAppSelector((state) => state.cart_slice);
  console.log(cart?.lineItems);
  if (isLoading) return <Loader />;

  return (
    <section>
      <h1 className={styles.title}>Корзина</h1>
      {errorMessage ? (
        <p className={styles.error_message}>Хм... {errorMessage}</p>
      ) : cart?.lineItems.length ? (
        <div className={styles.products_wrapper}>
          {cart.lineItems.map((item: LineItem, index) => {
            const price = item.price.value.centAmount;
            const discountPrice = item.price.discounted?.value.centAmount;
            const bgImageUrl = item.variant?.images?.length ? item.variant.images[0].url : '';

            return (
              <table className={styles.product} key={index}>
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
                      <p className={styles.total}>{formatPrice(item.totalPrice.centAmount)}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      ) : (
        <p className={styles.empty_message}>
          Корзина пуста... Но космос бесконечен, и так же бесконечны возможности для покупок!
        </p>
      )}
    </section>
  );
}
