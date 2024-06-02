import { useEffect, useMemo } from 'react';
import { getProducts } from '../../../api/products/getProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../Loader/Loader';
import { ProductCard } from './ProductCard/ProductCard';
import { Search } from './Search/Search';
import type { ProductsSliceState } from '../../../store/slices/products-slice';
import styles from './Catalog.module.css';
import { Filters } from './Filters/Filters';
import { Sort } from './Sort/Sort';
import type { getProductsRequestProps } from '../Main.interfaces';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlanetFromLocation, getSubcategoryFromLocation } from '../../../helpers/locationHandlers';

export function Catalog() {
  const dispatch = useAppDispatch();
  const { isProductsLoading, products, filter, sort }: ProductsSliceState = useAppSelector(
    (state) => state.products_slice
  );
  const { planet } = useAppSelector((state) => state.planet_slice);
  const navigate = useNavigate();
  const location = useLocation();

  const locationParts = useMemo(() => {
    const planet = getPlanetFromLocation(location.pathname);
    const subcategory = getSubcategoryFromLocation(location.pathname);
    return { planet: planet, subcategory: subcategory };
  }, [location.pathname]);

  useEffect(() => {
    if (locationParts.planet) {
      const actionPayload: getProductsRequestProps = {
        planet: locationParts.planet,
        subcategory: locationParts.subcategory ?? undefined,
        filter: filter.value && filter.type ? filter : undefined,
        sortValue: sort ?? undefined
      };
      dispatch(getProducts(actionPayload));
    }
  }, [dispatch, locationParts, sort, filter]);

  useEffect(() => {
    if (!locationParts.planet) {
      navigate(`${planet}`);
    }
  }, [locationParts.planet, planet, navigate]);

  return isProductsLoading ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs />
      <div className={styles.filters_wrapper}>
        <Search />
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
