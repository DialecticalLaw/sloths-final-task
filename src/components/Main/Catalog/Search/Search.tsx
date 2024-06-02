import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useState } from 'react';
import styles from './Search.module.css';
import { resetSearch, setSearchQuery } from '../../../../store/slices/products-slice';

export function Search() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.products_slice.searchQuery);
  const [query, setQuery] = useState(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      dispatch(resetSearch());
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(query));
    if (query.trim()) {
      try {
        console.log();
      } catch (error) {
        console.error('Ошибка при поиске продуктов:', error);
      }
    } else {
      dispatch(resetSearch());
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
      <button
        type="submit"
        className={`${styles.search_button} ${!query.trim() ? styles.disabled : ''}`}
        disabled={!query.trim()}
      >
        Поиск
      </button>
    </form>
  );
}
