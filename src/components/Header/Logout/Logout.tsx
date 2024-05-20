import { logout } from '../../../api/customers/logoutCustomer';
import { useAppDispatch } from '../../../store/hooks';
import styles from './Logout.module.css';
import { useNavigate } from 'react-router-dom';

export function Logout(toggleMenuOpen) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <button
      className={styles.button}
      onClick={() => {
        toggleMenuOpen();
        logout(dispatch);
        navigate('/login');
      }}
    >
      Выход
    </button>
  );
}
