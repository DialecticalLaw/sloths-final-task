import type { ProductData as BaseProductData } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: ProductData;
}

export interface ProductData extends BaseProductData {
  readonly id: string;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const bgImageUrl = product.masterVariant?.images ? product.masterVariant?.images[0]?.url : '';
  const price = product.masterVariant?.prices ? product.masterVariant.prices[0]?.value.centAmount : '';
  const discountPrice = product.masterVariant?.prices
    ? product.masterVariant.prices[0]?.discounted?.value.centAmount
    : '';

  const handleClick = (id: string): void => {
    navigate({ pathname: `/product/${id}` });
  };

  return (
    <div
      className={styles.product_card}
      onClick={() => {
        handleClick(product.id);
      }}
    >
      <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
      <p className={styles.product_desc}>{product.description?.ru}</p>
      <div className={styles.product_info_wrapper}>
        <h3 className={styles.product_name}>{product.name.ru}</h3>
        <span className={discountPrice ? styles.crossed_price : styles.product_price}>{price}</span>
        {discountPrice && <span className={styles.discount_price}>{discountPrice}</span>}
      </div>
    </div>
  );
}
