import styles from './Navigation.module.css';
import { CustomNavLink } from './NavLink';
import { useAppSelector } from '../../../store/hooks';
import { Logout } from '../../Main/Logout/Logout';

export function Navigation() {
  const isAuth = useAppSelector((state) => state.customer_slice.customerId);

  return (
    <nav>
      <ul className={styles.navigation_list}>
        <li>
          <CustomNavLink text={'Catalog'} to={`/catalog`} />
        </li>
        <li>
          <CustomNavLink text={'About'} to={`/about`} />
        </li>
        {!isAuth && (
          <>
            <li>
              <CustomNavLink text={'Login'} to={'/login'} />
            </li>
            <li>
              <CustomNavLink text={'Registration'} to={'/register'} />
            </li>
          </>
        )}
        {isAuth && (
          <>
            <li>
              <CustomNavLink text={'Профиль'} to={'/profile'} />
            </li>
            <li>
              <Logout />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
