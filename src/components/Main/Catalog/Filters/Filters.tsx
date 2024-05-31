import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useState } from 'react';
import styles from '../../../univComponents/Checkbox/Checkbox.module.css';
import style from './Filters.module.css';
import type { Filter } from '../../Main.interfaces';
import { setFilter } from '../../../../store/slices/products-slice';

export function Filters() {
  const dispatch = useAppDispatch();
  const { products, filter } = useAppSelector((state) => state.products_slice);
  const [attributes, setAttributes] = useState<Filter[]>([]);
  const { subcategory } = useAppSelector((state) => state.planet_slice);

  useEffect(() => {
    if (subcategory && products.length) {
      const attributeSet = new Set<string>();
      const uniqueAttributes: Filter[] = [];

      products.forEach((product) => {
        product.masterVariant?.attributes?.forEach((attribute) => {
          const attributeString = JSON.stringify({ type: attribute.name, value: attribute.value });
          if (!attributeSet.has(attributeString)) {
            attributeSet.add(attributeString);
            uniqueAttributes.push({ type: attribute.name, value: attribute.value });
          }
        });
      });

      setAttributes(uniqueAttributes);
    }
  }, [products, subcategory]);

  const handleClick = (atr: Filter) => {
    const newValue = atr.value[0] === filter.value[0] ? null : atr.value;
    const filterValue = newValue ? { type: atr.type, value: atr.value } : null;
    dispatch(setFilter(filterValue));
  };

  return (
    <div className={style.filters}>
      {attributes.length > 0 &&
        attributes.map(
          (atr, index) =>
            atr && (
              <label key={index} className={style.filter_item} onClick={() => handleClick(atr)}>
                <input
                  className={styles.checkbox + ' ' + (filter.value[0] === atr.value[0] ? styles.checked : '')}
                  type="checkbox"
                  value={atr.value}
                  defaultChecked={filter.value === atr.value}
                />
                {atr.value}
              </label>
            )
        )}
    </div>
  );
}
