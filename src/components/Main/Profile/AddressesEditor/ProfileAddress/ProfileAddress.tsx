import { useState } from 'react';
import { Button } from '../../../../univComponents/Button/Button';
import { Checkbox } from '../../../../univComponents/Checkbox/Checkbox';
import { Input } from '../../../../univComponents/CustomForm/Input/Input';
import { CountrySelect } from '../../../../univComponents/CustomForm/RegisterAddress/CountrySelect/CountrySelect';
import trashIcon from '../../../../../assets/img/trash.svg';
import styles from './ProfileAddress.module.css';
import { updateSimpleData } from '../../../../../api/customers/updateSimpleData';
import type { Customer } from '@commercetools/platform-sdk';
import { showToast } from '../../../../../helpers/showToast';
import { errorHandler } from '../../../../../helpers/errorHandler';
import { getCustomer } from '../../../../../api/customers/getCustomer';
import { useAppDispatch } from '../../../../../store/hooks';

export function ProfileAddress({
  index,
  addressId,
  customerData,
  isNew,
  setAddingAddress
}: {
  index?: number;
  addressId?: string;
  customerData?: Customer;
  isNew?: boolean;
  setAddingAddress?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const [isEditMode, setEditMode] = useState(false);
  console.log(customerData);

  return (
    <fieldset className={styles.address}>
      <legend className={styles.legend}>{isNew ? 'Новый адрес' : `Адрес ${(index || 0) + 1}`}</legend>

      {!isNew && customerData && (
        <button
          type="button"
          className={styles.delete_btn}
          onClick={() => {
            const customerPromise: Promise<Customer> = updateSimpleData({
              version: customerData.version,
              ID: customerData.id,
              actions: [
                {
                  action: 'removeAddress',
                  addressId: addressId
                }
              ]
            });
            showToast({
              promise: customerPromise,
              pending: 'Удаляем...',
              success: 'Адрес удалён!',
              errorHandler: errorHandler
            });
            customerPromise.then(() => {
              dispatch(getCustomer(customerData.id));
            });
          }}
          title="Удалить адрес"
        >
          <img className={styles.delete_icon} src={trashIcon} alt="delete" />
        </button>
      )}

      <CountrySelect disabled={isNew ? false : !isEditMode} name="country"></CountrySelect>
      <Input disabled={isNew ? false : !isEditMode} name="city" type="text" placeholder="Город"></Input>
      <Input disabled={isNew ? false : !isEditMode} name="street" type="text" placeholder="Улица"></Input>
      <Input
        disabled={isNew ? false : !isEditMode}
        name="postalCode"
        type="text"
        placeholder="Почтовый индекс"
      ></Input>
      {isEditMode && <Checkbox name="isDefault">Использовать по умолчанию</Checkbox>}

      {isEditMode || isNew ? (
        <div className={styles.buttons}>
          <Button classes={[styles.button, styles.save_btn]} minimal={true} type="submit">
            {isNew ? 'Добавить' : 'Сохранить'}
          </Button>
          <Button
            onClick={() => {
              setAddingAddress ? setAddingAddress(false) : setEditMode(false);
            }}
            classes={[styles.button]}
            minimal={true}
            type="button"
          >
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
