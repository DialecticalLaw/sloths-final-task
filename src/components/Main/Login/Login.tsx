import { Formik } from 'formik';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { CustomLink } from '../../univComponents/CustomForm/CustomLink/CustomLink';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import { LoginSchema } from '../validationSchemes';
import type { LoginValues } from '../Main.interfaces';
import { useAppDispatch } from '../../../store/hooks';
import { login } from './auth';
import { showToast } from '../../../helpers/showToast';
import { loginErrorHandler } from '../../../helpers/errorHandler';

const initialValues: LoginValues = {
  email: '',
  password: ''
};

export function Login() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async (values: LoginValues, { resetForm }) => {
          const loginPromise = login(values, dispatch);
          showToast({
            promise: loginPromise,
            pending: 'Ожидайте...',
            success: 'Успешная авторизация!',
            errorHandler: loginErrorHandler
          });
          loginPromise.then(() => {
            resetForm();
          });
        }}
      >
        <CustomForm>
          <>
            <Title mainText={'Авторизация'} additionText={'С возвращением'} />
            <Input name={'email'} type="text" placeholder="Эл. почта" />
            <Input name={'password'} type="password" placeholder="Пароль" />
            <Button type="submit">Войти</Button>
            <CustomLink text="Нет аккаунта?" to="/register">
              Зарегистрируйтесь
            </CustomLink>
          </>
        </CustomForm>
      </Formik>
    </>
  );
}
