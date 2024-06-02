import type { Address } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../../store/hooks';
import type { CustomerSliceState } from '../../../store/slices/customer-slice';
import styles from './Profile.module.css';
import { ProfileEditor } from './ProfileEditor/ProfileEditor';
import { ProfileViewer } from './ProfileViewer/ProfileViewer';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';
import { PasswordEditor } from './PasswordEditor/PasswordEditor';

export function Profile() {
  const { customerId, isCustomerLoading, customerData, errorMessage }: CustomerSliceState = useAppSelector(
    (state) => state.customer_slice
  );

  const shippingAddress = customerData?.addresses.find((address: Address) => {
    if (customerData.shippingAddressIds) return address.id === customerData.shippingAddressIds[0];
    return false;
  });
  const billingAddress = customerData?.addresses.find((address: Address) => {
    if (customerData.billingAddressIds) return address.id === customerData.billingAddressIds[0];
    return false;
  });

  const [isEditMode, setEditMode] = useState(false);

  return isCustomerLoading ? (
    <Loader />
  ) : errorMessage ? (
    <p>Упс... Что-то пошло не так: {errorMessage}</p>
  ) : customerData && shippingAddress && billingAddress && customerId ? (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <h1>Профиль</h1>
        {isEditMode ? (
          <ProfileEditor
            setEditMode={setEditMode}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            customerData={customerData}
          />
        ) : (
          <>
            <ProfileViewer
              setEditMode={setEditMode}
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              customerData={customerData}
            />
            <PasswordEditor customerData={customerData} />
          </>
        )}
      </div>
    </div>
  ) : (
    <p>Не найдены данные пользователя</p>
  );
}
