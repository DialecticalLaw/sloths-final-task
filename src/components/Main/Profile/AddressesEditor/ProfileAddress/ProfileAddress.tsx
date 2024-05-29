import { useState } from 'react';
import { Button } from '../../../../univComponents/Button/Button';
import { Checkbox } from '../../../../univComponents/Checkbox/Checkbox';
import { Input } from '../../../../univComponents/CustomForm/Input/Input';
import { CountrySelect } from '../../../../univComponents/CustomForm/RegisterAddress/CountrySelect/CountrySelect';
import styles from './ProfileAddress.module.css';

export function ProfileAddress({ index }: { index: number }) {
  const [isEditMode, setEditMode] = useState(false);

  return (
    <fieldset className={`${styles.address} ${isEditMode && styles.editing_address}`}>
      <legend className={styles.legend}>Адрес {index + 1}</legend>
      <CountrySelect disabled={!isEditMode} name="country"></CountrySelect>
      <Input disabled={!isEditMode} name="city" type="text" placeholder="Город"></Input>
      <Input disabled={!isEditMode} name="street" type="text" placeholder="Улица"></Input>
      <Input disabled={!isEditMode} name="postalCode" type="text" placeholder="Почтовый индекс"></Input>
      {isEditMode && <Checkbox name="isDefault">Использовать по умолчанию</Checkbox>}

      {isEditMode ? (
        <div className={styles.buttons}>
          <Button classes={[styles.button]} minimal={true} type="submit">
            Сохранить
          </Button>
          <Button onClick={() => setEditMode(false)} classes={[styles.button]} minimal={true} type="button">
            Отмена
          </Button>
        </div>
      ) : (
        <Button onClick={() => setEditMode(true)} type="button">
          Изменить
        </Button>
      )}
    </fieldset>
  );
}
