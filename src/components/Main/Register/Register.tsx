import { Formik } from 'formik';
import { CustomForm } from '../../universal-components/CustomForm/Form';
import { Input } from '../../universal-components/CustomForm/Input/Input';
import { Button } from '../../universal-components/Button/Button';
import { ValidError } from '../../universal-components/ValidError/ValidError';
import { Title } from '../../universal-components/CustomForm/Title/Title';
import styles from './Register.module.css';
import video from '../../../assets/video/starry-sky.webm';
import { Planets } from './Planets/Planets';

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
  country: '',
  planet: 'earth'
};

export function Register() {
  return (
    <>
      <video src={video} className={styles.video} loop muted autoPlay></video>
      <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
        {() => (
          <CustomForm>
            <>
              <Title>Registration</Title>
              <Input name={'email'} type="email" placeholder="Email"></Input>
              <ValidError name="email"></ValidError>
              <Input name={'password'} type="password" placeholder="Password"></Input>
              <ValidError name="password"></ValidError>
              <div className={styles.inputsGroup}>
                <Input name={'firstName'} type="text" placeholder="Name"></Input>
                <ValidError name="firstName"></ValidError>
                <Input name={'lastName'} type="text" placeholder="Surname"></Input>
                <ValidError name="lastName"></ValidError>
              </div>
              <Input name={'dateOfBirth'} type="date" placeholder="Date of birth"></Input>
              <ValidError name="dateOfBirth"></ValidError>
              <div className={styles.inputsGroup}>
                <Input name={'street'} type="text" placeholder="Street"></Input>
                <ValidError name="street"></ValidError>
                <Input name={'city'} type="text" placeholder="City"></Input>
                <ValidError name="city"></ValidError>
              </div>
              <div className={styles.inputsGroup}>
                <Input name={'postalCode'} type="text" placeholder="Postal code"></Input>
                <ValidError name="postalCode"></ValidError>
                <Input name={'country'} type="text" placeholder="Country"></Input>
                <ValidError name="country"></ValidError>
              </div>
              <Planets name={'planet'}></Planets>
              <Button type="submit">Register</Button>
            </>
          </CustomForm>
        )}
      </Formik>
    </>
  );
}
