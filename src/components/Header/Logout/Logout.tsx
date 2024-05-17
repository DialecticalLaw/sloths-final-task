import { logout } from '../../../api/customers/logoutCustomer';
import { useAppDispatch } from '../../../store/hooks';
import logoutIcon from '../../../assets/img/log-out.svg';
import styles from './Logout.module.css';

export function Logout() {
  const dispatch = useAppDispatch();
  return (
    <button className={styles.button} onClick={() => logout(dispatch)}>
      <span>Выход</span>
      <img className={styles.icon} src={logoutIcon} alt={'Logout'} />
    </button>
  );
}
