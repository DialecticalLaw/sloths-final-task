import styles from './Sort.module.css';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import type { ChangeEvent } from 'react';
import { getProducts } from '../../../../api/products/getProducts';
import { SortValues } from '../../Main.interfaces';

export function Sort() {
  const { planet, subcategory } = useAppSelector((state) => state.planet_slice);
  const dispatch = useAppDispatch();
  const onHandleClick = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortValues;

    if (value) {
      dispatch(getProducts({ planet: planet, subcategory: subcategory ?? undefined, sortValue: value }));
    }
  };
  return (
    <>
      <select id="sort-select" className={styles.select_field} onChange={onHandleClick}>
        <option value="">Сортировать</option>
        <option value={SortValues.priceUp}>по возрастанию цены</option>
        <option value={SortValues.priceDown}>по убыванию цены</option>
        <option value={SortValues.alphabet}>по алфавиту</option>
      </select>
    </>
  );
}
