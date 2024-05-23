import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { getCustomer } from '../../../api/customers/getCustomer';
import type { Customer } from '@commercetools/platform-sdk';
import { Loader } from '../Loader/Loader';

export function Profile() {
  const [customer, setCustomer] = useState<Customer | undefined>();
  const customerId: string | null = useAppSelector((state) => state.customer_slice.customerId);

  useEffect(() => {
    if (!customerId) throw new Error('customerId is null');
    const customerData: Promise<Customer> = getCustomer(customerId);
    customerData.then((data) => {
      console.log(data);
      setCustomer(data);
    });
  }, [customerId]);

  return !customer ? (
    <Loader />
  ) : (
    <>
      {customerId && <p>customer: {customer.firstName}</p>}
      <h1>Профиль</h1>
    </>
  );
}
