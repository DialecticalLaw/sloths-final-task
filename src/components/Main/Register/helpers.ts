import type { RegisterValues } from '../Main.interfaces';
import type { CustomerBody } from '../../../api/api.interfaces';

export const formatCustomerData = (values: RegisterValues): CustomerBody => {
  const customerBody: CustomerBody = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    addresses: [
      {
        country: values.address.country === 'Russia' ? 'RU' : 'BY',
        city: values.address.city,
        streetName: values.address.street,
        postalCode: values.address.postalCode
      }
    ]
  };

  if (values.address.isDefault) {
    customerBody.defaultShippingAddress = 0;
    customerBody.defaultBillingAddress = 0;
  }

  return customerBody;
};
