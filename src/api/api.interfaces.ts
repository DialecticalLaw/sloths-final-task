export interface Address {
  country: 'RU' | 'BY';
  city: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
}

export interface createCustomerBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
}
