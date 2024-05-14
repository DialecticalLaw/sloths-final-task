import { Formik } from 'formik';
import { showToast } from '../../../helpers/showToast';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { CustomLink } from '../../univComponents/CustomForm/CustomLink/CustomLink';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import { LoginSchema } from '../validationSchemes';
import type { LoginValues } from '../Main.interfaces';
import { loginCustomer } from '../../../api/customers/loginCustomer';


const login = async (values: LoginValues) => {
  const { email, password } = values;
  return loginCustomer({email, password})
};

const initialValues: LoginValues = {
  email: '',
  password: ''
};

export function Login() {
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={async (values) => {
      showToast({
        promise: login(values),
        pending: 'Logging in...',
        success: 'Successful login!',
        error: 'error'
      });
    }}>
        <CustomForm>
          <>
            <Title mainText={'Login'} additionText={'Welcome back to the future'}></Title>
            <Input name={'email'} type="text" placeholder="Email"></Input>

            <Input name={'password'} type="password" placeholder="Password"></Input>

            <Button type="submit">Login</Button>
            <CustomLink text="Don't have an account yet?" to="/register">
              Register
            </CustomLink>
          </>
        </CustomForm>
      </Formik>
    </>
  );
}
