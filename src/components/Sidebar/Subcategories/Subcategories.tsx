import styles from './Subcategories.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilter, setSubcategory } from '../../../store/slices/products-slice';
export enum Subcategories {
  food = 'еда',
  pets = 'питомцы',
  appliances = 'техника'
}

export function SubcategoriesList() {
  const { subcategory } = useAppSelector((state) => state.products_slice);
  const dispatch = useAppDispatch();

  const handleClick = (subcategory: Subcategories) => {
    dispatch(setSubcategory(subcategory));
    dispatch(setFilter(null));
  };
  return (
    <div className={styles.list}>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.pets}
          defaultChecked={subcategory === Subcategories.pets}
          onClick={() => {
            handleClick(Subcategories.pets);
          }}
          className={styles.radio}
        />
        {Subcategories.pets.toUpperCase()}
      </label>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.food}
          defaultChecked={subcategory === Subcategories.food}
          onClick={() => {
            handleClick(Subcategories.food);
          }}
          className={styles.radio}
        />
        {Subcategories.food.toUpperCase()}
      </label>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.appliances}
          defaultChecked={subcategory === Subcategories.appliances}
          onClick={() => {
            handleClick(Subcategories.appliances);
          }}
          className={styles.radio}
        />
        {Subcategories.appliances.toUpperCase()}
      </label>
    </div>
  );
}
