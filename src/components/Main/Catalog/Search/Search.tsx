import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useState } from 'react';
import styles from './Search.module.css';
import { setProducts, setProductsLoading, setSearchQuery } from '../../../../store/slices/products-slice';
import { getProducts, getSearchProducts } from '../../../../api/products/getProducts';

export function Search() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.products_slice.searchQuery);
  const [query, setQuery] = useState(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(query));
    dispatch(setProductsLoading(true));
    try {
      const response = await getSearchProducts([], '', query);
      console.log('Search response:', response.body.results);
      dispatch(setProducts(response.body.results));
    } catch (error) {
      console.error('Ошибка при поиске продуктов:', error);
    } finally {
      dispatch(setProductsLoading(false));
    }
  };

  return (
    <form className={styles.search_wrapper} onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Найду все"
        onChange={handleInputChange}
        className={styles.search_input}
        value={query}
      />
      <button type="submit" className={styles.search_button}>
        Поиск
      </button>
    </form>
  );
}
