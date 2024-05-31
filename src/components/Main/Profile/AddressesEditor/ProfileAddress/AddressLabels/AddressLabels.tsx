import type { Customer } from '@commercetools/platform-sdk';
import styles from './AddressLabels.module.css';
import shippingIcon from '../../../../../../assets/img/shipping.svg';
import billingIcon from '../../../../../../assets/img/billing.svg';

export function AddressLabels({ customerData, addressId }: { customerData?: Customer; addressId?: string }) {
  if (!customerData || !addressId) throw new Error('customerData or addressId is undefined');

  return (
    <div className={styles.label_wrapper}>
      {/* {customerData.shippingAddressIds && customerData.shippingAddressIds.find((id) => id === addressId) && (
        <button
          type="button"
          className={`${styles.label} ${styles.shipping}`}
          title="Адрес доставки"
        ></button>
      )}

      {customerData.billingAddressIds && customerData.billingAddressIds.find((id) => id === addressId) && (
        <button
          type="button"
          className={`${styles.label} ${styles.billing}`}
          title="Адрес выставления счёта"
        ></button>
      )}

      {customerData.defaultShippingAddressId === addressId && (
        <button
          type="button"
          className={`${styles.label} ${styles.default_shipping}`}
          title="Адрес доставки по умолчанию"
        ></button>
      )}

      {customerData.defaultBillingAddressId === addressId && (
        <button
          type="button"
          className={`${styles.label} ${styles.default_billing}`}
          title="Адрес выставления счёта по умолчанию"
        ></button>
      )} */}
      <button
        type="button"
        className={`${styles.label} ${customerData.shippingAddressIds && customerData.shippingAddressIds.find((id) => id === addressId) && styles.active_label}`}
        title="Адрес доставки"
      >
        <img src={shippingIcon} alt="shipping" className={styles.label_icon} />
      </button>

      <button
        type="button"
        className={`${styles.label} ${styles.default} ${customerData.defaultShippingAddressId === addressId && styles.active_label}`}
        title="Адрес доставки по умолчанию"
      >
        <img src={shippingIcon} alt="shipping" className={styles.label_icon} />
      </button>

      <button
        type="button"
        className={`${styles.label} ${customerData.billingAddressIds && customerData.billingAddressIds.find((id) => id === addressId) && styles.active_label}`}
        title="Адрес выставления счёта"
      >
        <img src={billingIcon} alt="billing" className={styles.label_icon} />
      </button>

      <button
        type="button"
        className={`${styles.label} ${styles.default} ${customerData.defaultBillingAddressId === addressId && styles.active_label}`}
        title="Адрес выставления счёта по умолчанию"
      >
        <img src={billingIcon} alt="billing" className={styles.label_icon} />
      </button>
    </div>
  );
}
