import { useEffect } from 'react';
import { getProducts } from '../../../api/products/getProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../Loader/Loader';
import { ProductCard } from './ProductCard/ProductCard';
import type { ProductsSliceState } from '../../../store/slices/products-slice';
import styles from './Catalog.module.css';
import { Filters } from './Filters/Filters';
import { Sort } from './Sort/Sort';

export function Catalog() {
  const dispatch = useAppDispatch();
  const { isProductsLoading, products }: ProductsSliceState = useAppSelector((state) => state.products_slice);
  const { planet } = useAppSelector((state) => state.planet_slice);
  const { subcategory } = useAppSelector((state) => state.planet_slice);

  useEffect(() => {
    if (planet) {
      const actionPayload = subcategory ? { planet, subcategory } : { planet };
      dispatch(getProducts(actionPayload));
    }
  }, [dispatch, planet, subcategory]);

  return isProductsLoading ? (
    <Loader />
  ) : (
    <>
      <div className={styles.filters_wrapper}>
        <Filters />
        <Sort />
      </div>
      <section className={styles.cards_wrapper}>
        {products.map((productData, index) => (
          <ProductCard product={productData} key={index} />
        ))}
      </section>
    </>
  );
}
