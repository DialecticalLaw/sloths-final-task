import styles from './HorizontalSidebar.module.css';
import { useAppSelector } from '../../store/hooks';
import { planetsConfig, usePlanetClickHandler } from '../../helpers/planetsConfig';

export function HorizontalSidebar() {
  const { planet } = useAppSelector((state) => state.planet_slice);
  const onPlanetClick = usePlanetClickHandler();

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.subtitle}>Загляните в каталог - найдётся всё, что нужно для счастья.</h2>
      <div className={styles.planet_list}>
        {planetsConfig.map((planetItem) => (
          <label key={planetItem.value} className={styles.planet_item}>
            <input
              type="radio"
              name="picked"
              value={planetItem.value}
              className={`${styles.planet} ${styles[planetItem.className]}`}
              defaultChecked={planetItem.value === planet}
              onClick={onPlanetClick}
            />
            <div className={styles.planet_name}>
              <span className={styles.underline}>_</span>
              {planetItem.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
