import { useEffect } from 'react';
import { getProducts } from '../../../api/products/getProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../Loader/Loader';

export function Catalog() {
  const dispatch = useAppDispatch();
  const { isProductsLoading } = useAppSelector((state) => state.products_slice);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return isProductsLoading ? (
    <Loader />
  ) : (
    <>
      <h1>Каталог</h1>
    </>
  );
}
