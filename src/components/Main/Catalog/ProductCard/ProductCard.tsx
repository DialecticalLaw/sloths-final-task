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
      <h3 className={styles.product_name}>{product.name.ru}</h3>
      <p className={styles.product_desc}>{product.description?.ru}</p>
    </div>
  );
}
