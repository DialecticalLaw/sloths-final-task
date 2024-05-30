import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useState } from 'react';
import styles from '../../../univComponents/Checkbox/Checkbox.module.css';
import style from './Filters.module.css';
import { getProducts } from '../../../../api/products/getProducts';
import type { Filter } from '../../Main.interfaces';

export function Filters() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products_slice);
  const [attributes, setAttributes] = useState<Filter[]>([]);
  const { planet, subcategory } = useAppSelector((state) => state.planet_slice);
  const [checkedValue, setCheckedValue] = useState<null | string>(null);

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

  useEffect(() => {
    if (attributes.length === 1) {
      setCheckedValue(attributes[0].value);
    }
  }, [attributes]);

  const handleClick = (atr: Filter) => {
    const newValue = atr.value === checkedValue ? null : atr.value;
    dispatch(
      getProducts({
        planet: planet,
        subcategory: subcategory ?? undefined,
        filter: newValue ? { type: atr.type, value: atr.value } : undefined
      })
    );
  };
  return (
    <div className={style.filters}>
      {attributes.length > 0 &&
        attributes.map(
          (atr, index) =>
            atr && (
              <label key={index} className={style.filter_item} onClick={() => handleClick(atr)}>
                <input
                  className={styles.checkbox + ' ' + (checkedValue === atr.value ? styles.checked : '')}
                  type="checkbox"
                  value={atr.value}
                  defaultChecked={checkedValue === atr.value}
                />
                {atr.value}
              </label>
            )
        )}
    </div>
  );
}
