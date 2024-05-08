import { Formik } from 'formik';
import { CustomForm } from '../../universal-components/CustomForm/Form';
import { Input } from '../../universal-components/Input/Input';
import { Button } from '../../universal-components/Button/Button';
import { ValidError } from '../../universal-components/ValidError/ValidError';

export interface StringObj {
  [key: string]: string;
}

export interface RegisterValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

const initialValues: RegisterValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  street: '',
  city: '',
  postalCode: '',
  country: ''
};

export function Register() {
  return (
    <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
      {() => (
        <CustomForm>
          <>
            <Input name={'email'} type="email" text="Enter your email"></Input>
            <ValidError name="email"></ValidError>
            <Input name={'password'} text="Enter password" type="password"></Input>
            <ValidError name="password"></ValidError>

            <div>
              <Input name={'firstName'} text="Enter your first name" type="text"></Input>
              <ValidError name="firstName"></ValidError>
              <Input name={'lastName'} text="Enter your surname" type="text"></Input>
              <ValidError name="lastName"></ValidError>
            </div>

            <Input name={'dateOfBirth'} text="Enter your date of birth" type="date"></Input>
            <ValidError name="dateOfBirth"></ValidError>

            <div>
              <Input name={'street'} text="Enter the street name" type="text"></Input>
              <ValidError name="street"></ValidError>
              <Input name={'city'} text="Enter the city name" type="text"></Input>
              <ValidError name="city"></ValidError>
            </div>

            <div>
              <Input name={'postalCode'} text="Enter your postal code" type="text"></Input>
              <ValidError name="postalCode"></ValidError>
              <Input name={'country'} text="Enter your country" type="text"></Input>
              <ValidError name="country"></ValidError>
            </div>

            <Button type="submit">Register</Button>
          </>
        </CustomForm>
      )}
    </Formik>
  );
}
