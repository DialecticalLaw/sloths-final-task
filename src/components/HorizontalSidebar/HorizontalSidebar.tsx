import styles from './HorizontalSidebar.module.css';
import { planetsConfig, usePlanetClickHandler } from '../../helpers/planetsConfig';
import { Planet } from '../univComponents/Planet/Planet';

export function HorizontalSidebar() {
  const onPlanetClick = usePlanetClickHandler();

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.subtitle}>Загляните в каталог - найдётся всё, что нужно для счастья.</h2>
      <div className={styles.planet_list}>
        {planetsConfig.map((planetItem) => (
          <Planet key={planetItem.value} planetItem={planetItem} onClick={onPlanetClick} />
        ))}
      </div>
    </div>
  );
}
