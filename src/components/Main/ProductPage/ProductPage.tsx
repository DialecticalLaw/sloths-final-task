import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRoot } from '../../../api/apiRoot';
import type { Product } from '@commercetools/platform-sdk';
import styles from './ProductPage.module.css';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiRoot.products().withId({ ID: id }).get().execute();
        setProduct(response.body);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const bgImageUrl = product.masterVariant?.images ? product.masterVariant?.images[0]?.url : '';

  return (
    <div className={styles.product_page}>
      <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
      <h1 className={styles.product_name}>{product.name}</h1>
      <p className={styles.product_desc}>{product.description}</p>
    </div>
  );
}
