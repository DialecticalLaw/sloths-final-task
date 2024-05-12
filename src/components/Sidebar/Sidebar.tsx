import { Field, Form, Formik } from 'formik';
import styles from './Sidebar.module.css';
import { useLocation } from 'react-router-dom';

function Sidebar() {
  const locationPath = useLocation().pathname;
  const isShow = ['/catalog', '/', '/about'].includes(locationPath);
  return (
    isShow && (
      <aside className={styles.sidebar}>
        <Formik
          initialValues={{
            picked: ''
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <div role="group" aria-labelledby="my-radio-group" className={styles.planet_list}>
              <label className={styles.planet_item}>
                <Field
                  type="radio"
                  name="picked"
                  value="Mars"
                  className={styles.planet + ' ' + styles.mars}
                />
                __MARS
              </label>
              <label className={styles.planet_item}>
                <Field
                  type="radio"
                  name="picked"
                  value="Venus"
                  className={styles.planet + ' ' + styles.venus}
                />
                __VENUS
              </label>
              <label className={styles.planet_item}>
                <Field
                  type="radio"
                  name="picked"
                  value="Earth"
                  className={styles.planet + ' ' + styles.earth}
                />
                __EARTH
              </label>
            </div>
          </Form>
        </Formik>
      </aside>
    )
  );
}
export default Sidebar;
