import type { Customer } from '@commercetools/platform-sdk';
import styles from './AddressLabels.module.css';

export function AddressLabels({ customerData, addressId }: { customerData?: Customer; addressId?: string }) {
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
        type="checkbox"
        checked={isShipping}
        className={`${styles.label} ${styles.shipping}`}
        title="Адрес доставки"
      />

      <input
        type="checkbox"
        checked={isDefaultShipping}
        className={`${styles.label} ${styles.default} ${styles.shipping}`}
        title="Адрес доставки по умолчанию"
      />

      <input
        type="checkbox"
        checked={isBilling}
        className={`${styles.label} ${styles.billing}`}
        title="Адрес выставления счёта"
      />

      <input
        type="checkbox"
        checked={isDefaultBilling}
        className={`${styles.label} ${styles.default} ${styles.billing}`}
        title="Адрес выставления счёта по умолчанию"
      />
    </div>
  );
}
