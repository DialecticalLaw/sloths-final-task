import { Formik } from 'formik';
import { CustomForm } from '../../universal-components/CustomForm/CustomForm';
import { Input } from '../../universal-components/CustomForm/Input/Input';
import { Button } from '../../universal-components/Button/Button';
import { ValidError } from '../../universal-components/ValidError/ValidError';
import { Title } from '../../universal-components/CustomForm/Title/Title';
import styles from './Register.module.css';
import { CountrySelect } from './CountrySelect/CountrySelect';
import { Planets } from './Planets/Planets';
import { RegisterSchema } from '../validationSchemes';

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
  country: 'Russia' | 'Belarus';
  planet: 'mars' | 'earth' | 'venus';
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
  country: 'Russia',
  planet: 'earth'
};

export function Register() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <CustomForm>
            <>
              <Title>Registration</Title>
              <Input name={'email'} type="email" placeholder="Email">
                <ValidError name="email"></ValidError>
              </Input>

              <Input name={'password'} type="password" placeholder="Password">
                <ValidError name="password"></ValidError>
              </Input>

              <div className={styles.inputsGroup}>
                <Input name={'firstName'} type="text" placeholder="Name">
                  <ValidError name="firstName"></ValidError>
                </Input>

                <Input name={'lastName'} type="text" placeholder="Surname">
                  <ValidError name="lastName"></ValidError>
                </Input>
              </div>

              <Input name={'dateOfBirth'} type="date" placeholder="Date of birth">
                <ValidError name="dateOfBirth"></ValidError>
              </Input>

              <CountrySelect name={'country'}></CountrySelect>

              <div className={styles.inputsGroup}>
                <Input name={'city'} type="text" placeholder="City">
                  <ValidError name="city"></ValidError>
                </Input>

                <Input name={'street'} type="text" placeholder="Street">
                  <ValidError name="street"></ValidError>
                </Input>
              </div>

              <Input name={'postalCode'} type="text" placeholder="Postal code">
                <ValidError name="postalCode"></ValidError>
              </Input>

              <Planets></Planets>
              <Button type="submit">Register</Button>
            </>
          </CustomForm>
        )}
      </Formik>
    </>
  );
}
