import { useAppSelector } from '../../../store/hooks';
import type { CustomerSliceState } from '../../../store/slices/customer-slice';
import styles from './Profile.module.css';
import { PersonalEditor } from './PersonalEditor/PersonalEditor';
import { ProfileViewer } from './ProfileViewer/ProfileViewer';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';
import { PasswordEditor } from './PasswordEditor/PasswordEditor';
import { AddressesEditor } from './AddressesEditor/AddressesEditor';
import editIcon from '../../../assets/img/edit.svg';
import passwordIcon from '../../../assets/img/change_password.svg';
import addressIcon from '../../../assets/img/address.svg';
import { Button } from '../../univComponents/Button/Button';
import { BgPlanets } from '../../Sidebar/Bg-planets';
import { ProfileMode } from '../Main.interfaces';

export function Profile() {
  const { customerId, isCustomerLoading, customerData, errorMessage }: CustomerSliceState = useAppSelector(
    (state) => state.customer_slice
  );
  const planet = useAppSelector((state) => state.planet_slice.planet);

  const [mode, setMode] = useState<ProfileMode>(ProfileMode.Default);

  if (isCustomerLoading) return <Loader />;
  if (errorMessage || !customerData || !customerId) return <p>Упс... Что-то пошло не так: {errorMessage}</p>;

  return (
    <div className={styles.profile}>
      {planet && <BgPlanets />}
      <div className={styles.profile_wrapper}>
        <h1>Профиль</h1>

        {mode === ProfileMode.PersonalEdit && (
          <PersonalEditor setMode={setMode} customerData={customerData} />
        )}

        {mode === ProfileMode.AddressesEdit && (
          <AddressesEditor setMode={setMode} customerData={customerData} />
        )}

        {mode === ProfileMode.PasswordEdit && (
          <PasswordEditor setMode={setMode} customerData={customerData} />
        )}

        {mode === ProfileMode.Default && (
          <>
            <ProfileViewer customerData={customerData} />
            <Button onClick={() => setMode(ProfileMode.PersonalEdit)} classes={[styles.button]} type="button">
              <>
                Редактировать <img src={editIcon} alt="personal" className={styles.icon} />
              </>
            </Button>

            <Button classes={[styles.button]} type="button" onClick={() => setMode(ProfileMode.PasswordEdit)}>
              <>
                Изменить пароль
                <img className={styles.icon} src={passwordIcon} alt="password" />
              </>
            </Button>

            <Button
              classes={[styles.button]}
              type="button"
              onClick={() => setMode(ProfileMode.AddressesEdit)}
            >
              <>
                Управление адресами
                <img className={styles.icon} src={addressIcon} alt="address" />
              </>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
