import { logout } from '../../../api/customers/logoutCustomer';
import { useAppDispatch } from '../../../store/hooks';
import styles from './Logout.module.css';
import { useNavigate } from 'react-router-dom';
import type { ToggleMenuProps } from '../Header.interfaces';

export function Logout({ toggleMenuOpen }: ToggleMenuProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (toggleMenuOpen) {
          toggleMenuOpen();
        }
        logout(dispatch);
        navigate('/login');
      }}
    >
      Выход
    </button>
  );
}
