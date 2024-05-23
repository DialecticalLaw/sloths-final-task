import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { getCustomer } from '../../../api/customers/getCustomer';
import type { Address, Customer } from '@commercetools/platform-sdk';
import { Loader } from '../Loader/Loader';
import styles from './Profile.module.css';
import avatarSrc from '../../../assets/img/avatar.svg';

export function Profile() {
  const [customer, setCustomer] = useState<Customer | undefined>();
  const customerId: string | null = useAppSelector((state) => state.customer_slice.customerId);

  useEffect(() => {
    if (!customerId) throw new Error('customerId is null');
    const customerData: Promise<Customer> = getCustomer(customerId);
    customerData.then((data) => {
      setCustomer(data);
    });
  }, [customerId]);

  const shippingAddress = customer?.addresses.find((address: Address) => {
    if (customer.shippingAddressIds) return address.id === customer.shippingAddressIds[0];
    return false;
  });
  const billingAddress = customer?.addresses.find((address: Address) => {
    if (customer.billingAddressIds) return address.id === customer.billingAddressIds[0];
    return false;
  });

  return !customer || !shippingAddress || !billingAddress ? (
    <Loader />
  ) : (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <h1>Профиль</h1>
        <img src={avatarSrc} alt="avatar" className={styles.avatar} />
        <section className={styles.personal_data}>
          <p>Имя: {customer.firstName}</p>
          <p>Фамилия: {customer.lastName}</p>
          <p>Email: {customer.email}</p>
          <p>Дата рождения: {customer.dateOfBirth}</p>
        </section>

        <section className={styles.addresses_data}>
          <fieldset className={styles.address_data}>
            <legend className={styles.legend}>Адрес доставки</legend>
            <p>Страна: {shippingAddress.country === 'RU' ? 'Россия' : 'Беларусь'}</p>
            <p>Город: {shippingAddress.city}</p>
            <p>Улица: {shippingAddress.streetName}</p>
            <p>Почтовый индекс: {shippingAddress.postalCode}</p>
            {customer.defaultShippingAddressId && <p className={styles.address_label}>Адрес по умолчанию</p>}
          </fieldset>

          <fieldset className={styles.address_data}>
            <legend className={styles.legend}>Адрес выставления счёта</legend>
            <p>Страна: {billingAddress.country === 'RU' ? 'Россия' : 'Беларусь'}</p>
            <p>Город: {billingAddress.city}</p>
            <p>Улица: {billingAddress.streetName}</p>
            <p>Почтовый индекс: {billingAddress.postalCode}</p>
            {customer.defaultBillingAddressId && <p className={styles.address_label}>Адрес по умолчанию</p>}
          </fieldset>
        </section>
      </div>
    </div>
  );
}
