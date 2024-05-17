import styles from './Navigation.module.css';
import { CustomNavLink } from './NavLink';
import { useAppSelector } from '../../../store/hooks';
import catalogIcon from '../../../assets/img/grid.svg';
import infoIcon from '../../../assets/img/info.svg';
import loginIcon from '../../../assets/img/log-in.svg';
import registerIcon from '../../../assets/img/user-plus.svg';
import profileIcon from '../../../assets/img/user.svg';
import { Logout } from '../Logout/Logout';

export function Navigation() {
  const isAuth = useAppSelector((state) => state.customer_slice.customerId);

  return (
    <nav>
      <ul className={styles.navigation_list}>
        <li>
          <CustomNavLink src={catalogIcon} text={'Каталог'} to={`/catalog`} />
        </li>
        <li>
          <CustomNavLink src={infoIcon} text={'О нас'} to={`/about`} />
        </li>
        {!isAuth && (
          <>
            <li>
              <CustomNavLink src={loginIcon} text={'Авторизация'} to={'/login'} />
            </li>
            <li>
              <CustomNavLink src={registerIcon} text={'Регистрация'} to={'/register'} />
            </li>
          </>
        )}
        {isAuth && (
          <>
            <li>
              <CustomNavLink src={profileIcon} text={'Профиль'} to={'/profile'} />
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
