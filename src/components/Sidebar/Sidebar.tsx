import styles from './Sidebar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPlanet, Planets } from '../../store/slices/planet-slice';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import arrowIcon from '../../assets/img/arrow.svg';
import { BgPlanets } from './Bg-planets';
import { SubcategoriesList } from './Subcategories/Subcategories';
import { setFilter } from '../../store/slices/products-slice';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const locationPath = useLocation().pathname;
  const isShowSubcategory = locationPath.startsWith('/catalog');
  const { planet } = useAppSelector((state) => state.planet_slice);
  const [isSidebarVisible, setVisibility] = useState<boolean>(false);
  const navigation = useNavigate();

  const planets = [
    { value: Planets.mars, label: '_Марс', className: 'mars' },
    { value: Planets.venus, label: '_Венера', className: 'venus' },
    { value: Planets.earth, label: '_Земля', className: 'earth' }
  ];

  const onPlanetClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value as Planets;
      setVisibility(false);
      dispatch(setPlanet(value));
      navigation(`/catalog/${value}`);
      dispatch(setFilter(null));
    }
  };
  const onSidebarHandlerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setVisibility(!isSidebarVisible);
  };

  return (
    <>
      <BgPlanets />
      <aside className={styles.sidebar + ' ' + (isSidebarVisible ? styles.sidebar__visible : '')}>
        <form className={styles.form}>
          <div className={styles.planet_list}>
            {planets.map((planetItem) => (
              <div className={styles.catalog_item} key={planetItem.value}>
                <label className={styles.planet_item}>
                  <input
                    type="radio"
                    name="picked"
                    value={planetItem.value}
                    className={`${styles.planet} ${styles[planetItem.className]}`}
                    defaultChecked={planetItem.value === planet}
                    onClick={onPlanetClick}
                  />
                  {planetItem.label}
                </label>
                {planetItem.value === planet && isShowSubcategory && (
                  <SubcategoriesList setVisibility={setVisibility} />
                )}
              </div>
            ))}
          </div>
          <button onClick={onSidebarHandlerClick} className={styles.arrow_wrapper}>
            <img src={arrowIcon} alt="arrow" className={styles.arrow} />
          </button>
        </form>
      </aside>
    </>
  );
}
