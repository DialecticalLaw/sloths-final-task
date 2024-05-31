import type { Customer } from '@commercetools/platform-sdk';
import styles from './AddressLabels.module.css';
import shippingIcon from '../../../../../../assets/img/shipping.svg';
import billingIcon from '../../../../../../assets/img/billing.svg';

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
      <button
        type="button"
        className={`${styles.label} ${isShipping && styles.active_label}`}
        title="Адрес доставки"
      >
        <img src={shippingIcon} alt="shipping" className={styles.label_icon} />
      </button>

      <button
        type="button"
        className={`${styles.label} ${styles.default} ${isDefaultShipping && styles.active_label}`}
        title="Адрес доставки по умолчанию"
      >
        <img src={shippingIcon} alt="shipping" className={styles.label_icon} />
      </button>

      <button
        type="button"
        className={`${styles.label} ${isBilling && styles.active_label}`}
        title="Адрес выставления счёта"
      >
        <img src={billingIcon} alt="billing" className={styles.label_icon} />
      </button>

      <button
        type="button"
        className={`${styles.label} ${styles.default} ${isDefaultBilling && styles.active_label}`}
        title="Адрес выставления счёта по умолчанию"
      >
        <img src={billingIcon} alt="billing" className={styles.label_icon} />
      </button>
    </div>
  );
}
