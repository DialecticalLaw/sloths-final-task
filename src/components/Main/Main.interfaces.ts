import type { Customer, ProductData } from '@commercetools/platform-sdk';

export interface StringObj {
  [key: string]: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface BillingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: 'RU' | 'BY';
  isDefault: boolean;
}

interface ShippingAddress extends BillingAddress {
  isSameAddress: boolean;
}

export interface RegisterValues extends LoginValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shipping: ShippingAddress;
  billing: BillingAddress;
}

export type ProfileEditorValues = Pick<RegisterValues, 'email' | 'firstName' | 'lastName' | 'dateOfBirth'>;

export interface EditorProps {
  setEditMode: React.Dispatch<
    React.SetStateAction<{
      isPersonalEdit: boolean;
      isAddressesEdit: boolean;
      isPasswordEdit: boolean;
    }>
  >;
  customerData: Customer;
}

export interface PasswordEditorValues {
  currentPassword: string;
  newPassword: string;
}

export interface ProductCardProps {
  product: ProductData;
}

export interface ProfileAddressProps {
  index?: number;
  addressId?: string;
  customerData?: Customer;
  isNew?: boolean;
  setAddingAddress?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}
