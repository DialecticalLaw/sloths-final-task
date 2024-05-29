import styles from './Sort.module.css';
export function Sort() {
  return (
    <>
      <select id="sort-select" className={styles.select_field}>
        <option value="">Сортировать</option>
        <option value="price-up">по возрастанию цены</option>
        <option value="price-down">по убыванию цены</option>
        <option value="alphabet">по алфавиту</option>
      </select>
    </>
  );
}
