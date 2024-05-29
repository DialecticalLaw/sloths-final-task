import type { CustomerUpdateAction, ErrorResponse } from '@commercetools/platform-sdk';

export interface Login {
  email: string;
  password: string;
}

export interface CustomerAddress {
  country: 'RU' | 'BY';
  city: string;
  streetName: string;
  postalCode: string;
}

export interface CustomerBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: CustomerAddress[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface ApiError {
  body: ErrorResponse;
  statusCode: number;
  message: string;
}

export interface UpdateSimpleData {
  ID: string;
  version: number;
  actions: CustomerUpdateAction[];
}

export interface UpdatePasswordData extends Omit<UpdateSimpleData, 'actions'> {
  currentPassword: string;
  newPassword: string;
}

// export interface AddressActionData {
//   customerId: string;
//   addressId: string;
// }
