import type { LoginValues } from '../Main.interfaces';
import type { AppDispatch } from '../../../store/store';
import { showToast } from '../../../helpers/showToast';
import { setCustomer } from '../../../store/slices/customer-slice';
import { loginCustomer } from '../../../api/customers/loginCustomer';

const resetForm = (values: LoginValues) => {
  values.email = '';
  values.password = '';
};
export const login = async (values: LoginValues, dispatch: AppDispatch): Promise<void> => {
  try {
    await loginCustomer(values).then(({ body }) => {
      showToast({
        text: 'Successful login!',
        type: 'success'
      });
      resetForm(values);
      dispatch(setCustomer(body.customer));
    });
  } catch (error) {
    showToast({
      text: 'Incorrect email or password. Please try again!',
      type: 'error'
    });
  }
};
