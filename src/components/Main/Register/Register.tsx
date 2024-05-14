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
import { Address } from '../../univComponents/CustomForm/Address/Address';

const initialValues: RegisterValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: {
    street: '',
    city: '',
    postalCode: '',
    country: 'Russia',
    isDefault: false
  }
};

const submitCustomerData = (values: RegisterValues) => {
  return createCustomer({
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
  });
};

export function Register() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, { resetForm }) =>
          submitCustomerData(values).then(() => {
            resetForm();
            showToast({ type: 'success', text: 'Successful registration!' });
          })
        }
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

            <Address />

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
