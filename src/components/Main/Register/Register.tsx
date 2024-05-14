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
import { Addresses } from '../../univComponents/CustomForm/Addresses/Addresses';
import type { CustomerBody } from '../../../api/api.interfaces';

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
  const customerBody: CustomerBody = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    addresses: [
      {
        country: values.shipping.country === 'Russia' ? 'RU' : 'BY',
        city: values.shipping.city,
        streetName: values.shipping.street,
        postalCode: values.shipping.postalCode
      }
    ]
  };
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

            <Addresses />

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
