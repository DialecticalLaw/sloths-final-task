import { useEffect, useState } from 'react';
import styles from './ProductDetail.module.css';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../api/products/getProducts';
import type { Product } from '@commercetools/platform-sdk';
import { Loader } from '../Loader/Loader';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          throw new Error('Товар не найден');
        }
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct || null);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  if (isLoading) {
    <Loader />;
  }

  const { name, description, masterVariant } = product.masterData.current;
  const bgImageUrl = masterVariant?.images ? masterVariant?.images[0]?.url : '';

  return (
    <div className={styles.product_detail}>
      <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
      <h1 className={styles.product_name}>{name?.ru}</h1>
      <p className={styles.product_desc}>{description?.ru}</p>
    </div>
  );
}
