import type { Customer } from '@commercetools/platform-sdk';
import styles from './AddressLabels.module.css';
import { updateSimpleData } from '../../../../../../api/customers/updateSimpleData';
import { errorHandler } from '../../../../../../helpers/errorHandler';
import { showToast } from '../../../../../../helpers/showToast';
import { getCustomer } from '../../../../../../api/customers/getCustomer';
import { useAppDispatch } from '../../../../../../store/hooks';

export function AddressLabels({ customerData, addressId }: { customerData?: Customer; addressId?: string }) {
  const dispatch = useAppDispatch();

  const isShipping = Boolean(
    customerData?.shippingAddressIds && customerData.shippingAddressIds.find((id) => id === addressId)
  );
  const isBilling = Boolean(
    customerData?.billingAddressIds && customerData.billingAddressIds.find((id) => id === addressId)
  );

  const isDefaultShipping = Boolean(addressId && customerData?.defaultShippingAddressId === addressId);
  const isDefaultBilling = Boolean(addressId && customerData?.defaultBillingAddressId === addressId);

  return (
    <div className={styles.label_wrapper}>
      <input
        onClick={() => {
          if (!customerData) return;
          const customerPromise: Promise<Customer> = updateSimpleData({
            version: customerData.version,
            ID: customerData.id,
            actions: [
              {
                action: isShipping ? 'removeShippingAddressId' : 'addShippingAddressId',
                addressId: addressId
              }
            ]
          });
          showToast({
            promise: customerPromise,
            pending: 'Изменяем...',
            success: 'Изменено!',
            errorHandler: errorHandler
          });
          customerPromise.then(() => {
            dispatch(getCustomer(customerData.id));
          });
        }}
        type="checkbox"
        checked={isShipping}
        className={`${styles.label} ${styles.shipping}`}
        title="Адрес доставки"
      />

      <input
        onClick={() => {
          if (!customerData) return;
          const customerPromise: Promise<Customer> = updateSimpleData({
            version: customerData.version,
            ID: customerData.id,
            actions: [
              {
                action: 'setDefaultShippingAddress',
                addressId: isDefaultShipping ? undefined : addressId
              }
            ]
          });
          showToast({
            promise: customerPromise,
            pending: 'Изменяем...',
            success: 'Изменено!',
            errorHandler: errorHandler
          });
          customerPromise.then(() => {
            dispatch(getCustomer(customerData.id));
          });
        }}
        type="checkbox"
        checked={isDefaultShipping}
        className={`${styles.label} ${styles.default} ${styles.shipping}`}
        title="Адрес доставки по умолчанию"
      />

      <input
        onClick={() => {
          if (!customerData) return;
          const customerPromise: Promise<Customer> = updateSimpleData({
            version: customerData.version,
            ID: customerData.id,
            actions: [
              {
                action: isBilling ? 'removeBillingAddressId' : 'addBillingAddressId',
                addressId: addressId
              }
            ]
          });
          showToast({
            promise: customerPromise,
            pending: 'Изменяем...',
            success: 'Изменено!',
            errorHandler: errorHandler
          });
          customerPromise.then(() => {
            dispatch(getCustomer(customerData.id));
          });
        }}
        type="checkbox"
        checked={isBilling}
        className={`${styles.label} ${styles.billing}`}
        title="Адрес выставления счёта"
      />

      <input
        onClick={() => {
          if (!customerData) return;
          const customerPromise: Promise<Customer> = updateSimpleData({
            version: customerData.version,
            ID: customerData.id,
            actions: [
              {
                action: 'setDefaultBillingAddress',
                addressId: isDefaultBilling ? undefined : addressId
              }
            ]
          });
          showToast({
            promise: customerPromise,
            pending: 'Изменяем...',
            success: 'Изменено!',
            errorHandler: errorHandler
          });
          customerPromise.then(() => {
            dispatch(getCustomer(customerData.id));
          });
        }}
        type="checkbox"
        checked={isDefaultBilling}
        className={`${styles.label} ${styles.default} ${styles.billing}`}
        title="Адрес выставления счёта по умолчанию"
      />
    </div>
  );
}
