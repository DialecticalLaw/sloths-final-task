import type { Customer, ProductProjection } from '@commercetools/platform-sdk';
import type { Planets } from '../../store/slices/planet-slice';
import type { Subcategories } from '../../helpers/translationMapper';
import type { AddressesActions } from '../../helpers/helpers.interfaces';
import type { MemberData } from '../../helpers/membersConfig';

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
  setMode: React.Dispatch<React.SetStateAction<ProfileMode>>;
  customerData: Customer;
}

export interface PasswordEditorValues {
  currentPassword: string;
  newPassword: string;
}

export interface ProductCardProps {
  product: ProductProjection;
}

export interface Filter {
  type: string;
  value: string;
}

export enum SortValues {
  priceUp = 'price asc',
  priceDown = 'price desc',
  alphabet = 'name.ru asc'
}

export interface getProductsRequestProps {
  planet?: Planets;
  subcategory?: Subcategories;
  filter?: Filter;
  sortValue?: SortValues;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export interface Image {
  url: string;
  label?: string;
}

export interface ImageModalProps {
  images: Image[];
  startIndex: number;
  active: boolean;
  setActive: (isActive: boolean) => void;
}

export interface ProfileAddressProps {
  index?: number;
  addressId?: string;
  customerData?: Customer;
  isNew?: boolean;
  setAddingAddress?: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ProfileMode {
  Default,
  PersonalEdit,
  AddressesEdit,
  PasswordEdit
}

export type AddressType = 'shipping' | 'billing' | 'defaultShipping' | 'defaultBilling';

export interface AddressFlag {
  action: AddressesActions;
  checked: boolean;
  styles: string[];
  addressId?: string;
}

export interface MemberProps {
  member: MemberData;
  onClose: () => void;
}

export interface ModalProps {
  modalCallback: (isActive: boolean) => void;
  className: string;
  children: React.ReactNode;
  modalState?: boolean;
  bg?: React.ReactNode;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionItemWithState extends AccordionItem {
  open: boolean;
}

export interface AccordionProps {
  data: AccordionItem[];
}
