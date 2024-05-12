import styles from './Sidebar.module.css';
import { useAppSelector } from '../../store/hooks';
import marsBig from '../../assets/img/planets/марс.png';
import marsSmall from '../../assets/img/planets/марс1.png';
import venusBig from '../../assets/img/planets/венера.png';
import venusSmall from '../../assets/img/planets/венера1.png';
import earthBig from '../../assets/img/planets/земля.png';
import earthSmall from '../../assets/img/planets/земля1.png';
import { Planets } from '../../store/slices/planet-slice';

function BgPlanets() {
  const planet = useAppSelector((state) => state.planet_slice.planet);

  const srcBig = planet === Planets.earth ? earthBig : planet === Planets.mars ? marsBig : venusBig;
  const srcSmall = planet === Planets.earth ? earthSmall : planet === Planets.mars ? marsSmall : venusSmall;

  return (
    planet && (
      <div className={styles.bg}>
        <img src={srcBig} className={styles.planet_big} alt={'Planet'} />
        <img src={srcSmall} className={styles.planet_small} alt={'Planet'} />
      </div>
    )
  );
}

export default BgPlanets;
