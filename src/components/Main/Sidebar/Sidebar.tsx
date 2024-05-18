import { Field, Form, Formik } from 'formik';
import styles from './Sidebar.module.css';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import type { Planet } from '../../../store/slices/planet-slice';
import { choosePlanet } from '../../../store/slices/planet-slice';
import arrowIcon from '../../../assets/img/arrow.svg';
import { useState } from 'react';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const locationPath = useLocation().pathname;
  const isShow = ['/catalog', '/', '/about', '/profile'].includes(locationPath);
  const planet = useAppSelector((state) => state.planet_slice.planet);
  const onPlanetClick = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value as Planet;
      if (value !== planet) {
        dispatch(choosePlanet(value));
      }
    }
  };
  const [isSidebarVisible, setVisibility] = useState<boolean>(false);

  return (
    isShow && (
      <>
        <aside className={isSidebarVisible ? `${styles.sidebar_visible} ${styles.sidebar}` : styles.sidebar}>
          <Formik
            initialValues={{
              picked: planet
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className={styles.form}>
              <div role="group" aria-labelledby="my-radio-group" className={styles.planet_list}>
                <label className={styles.planet_item}>
                  <Field
                    type="radio"
                    name="picked"
                    value="Venus"
                    className={styles.planet + ' ' + styles.venus}
                    onClick={(e: Event) => {
                      onPlanetClick(e);
                    }}
                  />
                  _Венера
                </label>
                <label className={styles.planet_item}>
                  <Field
                    type="radio"
                    name="picked"
                    value="Earth"
                    className={styles.planet + ' ' + styles.earth}
                    onClick={(e: Event) => {
                      onPlanetClick(e);
                    }}
                  />
                  _Земля
                </label>
                <label className={styles.planet_item}>
                  <Field
                    type="radio"
                    name="picked"
                    value="Mars"
                    className={styles.planet + ' ' + styles.mars}
                    onClick={(e: Event) => {
                      onPlanetClick(e);
                    }}
                  />
                  _Марс
                </label>
              </div>
              <button onClick={() => setVisibility(!isSidebarVisible)} className={styles.arrow_wrapper}>
                <img src={arrowIcon} alt="arrow" className={styles.arrow} />
              </button>
            </Form>
          </Formik>
        </aside>
      </>
    )
  );
}
