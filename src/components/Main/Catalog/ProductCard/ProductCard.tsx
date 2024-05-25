import type { ProductData } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: ProductData;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const bgImageUrl = product.masterVariant?.images ? product.masterVariant?.images[0]?.url : '';

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={styles.product_card} onClick={handleClick}>
      <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
      <h3 className={styles.product_name}>{product.name.ru}</h3>
      <p className={styles.product_desc}>{product.description?.ru}</p>
    </div>
  );
}
