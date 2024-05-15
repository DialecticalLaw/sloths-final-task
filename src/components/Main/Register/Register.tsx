import { Formik } from 'formik';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import styles from './Register.module.css';
import { RegisterSchema } from '../validationSchemes';
import type { RegisterValues } from '../Main.interfaces';
import { CustomLink } from '../../univComponents/CustomForm/CustomLink/CustomLink';
import { showToast } from '../../../helpers/showToast';
import { createCustomer } from '../../../api/customers/createCustomer';
import type { CustomerBody } from '../../../api/api.interfaces';
import { Address } from '../../univComponents/CustomForm/Address/Address';

const initialValues: RegisterValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  shipping: {
    street: '',
    city: '',
    postalCode: '',
    country: 'Russia',
    isDefault: false,
    isSameAddress: false
  },
  billing: {
    street: '',
    city: '',
    postalCode: '',
    country: 'Russia',
    isDefault: false
  }
};

const submitCustomerData = (values: RegisterValues) => {
  const shippingIndex = 0;
  const billingIndex = 1;

  const customerBody: CustomerBody = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    addresses: [
      {
        city: values.shipping.city,
        country: values.shipping.country === 'Russia' ? 'RU' : 'BY',
        postalCode: values.shipping.postalCode,
        streetName: values.shipping.street
      }
    ],
    shippingAddresses: [shippingIndex],
    billingAddresses: values.shipping.isSameAddress ? [shippingIndex] : [billingIndex]
  };

  if (values.shipping.isSameAddress && values.shipping.isDefault) {
    customerBody.defaultShippingAddress = shippingIndex;
    customerBody.defaultBillingAddress = shippingIndex;
  } else if (!values.shipping.isSameAddress) {
    customerBody.addresses.push({
      city: values.billing.city,
      country: values.shipping.country === 'Russia' ? 'RU' : 'BY',
      postalCode: values.billing.postalCode,
      streetName: values.billing.street
    });

    if (values.shipping.isDefault) {
      customerBody.defaultShippingAddress = shippingIndex;
    }
    if (values.billing.isDefault) {
      customerBody.defaultBillingAddress = billingIndex;
    }
  }

  return createCustomer(customerBody);
};

export function Register() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          showToast({
            promise: submitCustomerData(values),
            pending: 'Processing...',
            success: 'Successful registration!',
            error: 'error'
          });
        }}
      >
        <CustomForm>
          <>
            <Title mainText={'Register'} additionText={'Welcome to the future'}></Title>
            <Input name={'email'} type="email" placeholder="Email"></Input>

            <Input name={'password'} type="password" placeholder="Password"></Input>

            <div className={styles.inputsGroup}>
              <Input name={'firstName'} type="text" placeholder="Name"></Input>

              <Input name={'lastName'} type="text" placeholder="Surname"></Input>
            </div>

            <Input name={'dateOfBirth'} type="date" placeholder="Date of birth"></Input>

            <Address name="shipping" />
            <Address name="billing" />

            <Button type="submit">Register</Button>

            <CustomLink text="Already have an account?" to="/login">
              Login
            </CustomLink>
          </>
        </CustomForm>
      </Formik>
    </>
  );
}
