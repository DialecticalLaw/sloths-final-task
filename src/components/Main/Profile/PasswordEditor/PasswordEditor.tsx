import { Button } from '../../../univComponents/Button/Button';
import { Form, Formik } from 'formik';
import styles from './PasswordEditor.module.css';
import { Input } from '../../../univComponents/CustomForm/Input/Input';
import type { EditorProps, PasswordEditorValues } from '../../Main.interfaces';
import { PasswordEditorSchema } from '../../validationSchemes';
import type { Customer } from '@commercetools/platform-sdk';
import { updatePassword } from '../../../../api/customers/updateCustomer';
import { showToast } from '../../../../helpers/showToast';
import { errorHandler } from '../../../../helpers/errorHandler';
import { loginCustomer } from '../../../../api/customers/loginCustomer';
import { useAppDispatch } from '../../../../store/hooks';
import { getCustomer } from '../../../../api/customers/getCustomer';
import { EditorTitle } from '../EditorTitle/EditorTitle';

export function PasswordEditor({ customerData, setEditMode }: EditorProps) {
  const initialValues: PasswordEditorValues = {
    currentPassword: '',
    newPassword: ''
  };
  const dispatch = useAppDispatch();

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          const customerPromise: Promise<Customer> = updatePassword({
            ID: customerData.id,
            version: customerData.version,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
          });

          showToast({
            promise: customerPromise,
            pending: 'Обновляем...',
            success: 'Пароль обновлён!',
            errorHandler: errorHandler
          });
          resetForm();

          customerPromise
            .then(() => {
              loginCustomer(customerData.email, values.newPassword);
              dispatch(getCustomer(customerData.id));
              setEditMode((editModes) => {
                return {
                  ...editModes,
                  isPasswordEdit: false
                };
              });
            })
            .catch((error: Error) => console.error(error));
        }}
        validationSchema={PasswordEditorSchema}
      >
        <Form className={styles.form}>
          <EditorTitle>Изменение пароля</EditorTitle>
          <Input placeholder="Текущий пароль" name="currentPassword" type="password" />
          <Input placeholder="Новый пароль" name="newPassword" type="password" />
          <Button classes={[styles.submit_btn]} type="submit">
            Сохранить
          </Button>
          <Button
            onClick={() => {
              setEditMode((editModes) => {
                return {
                  ...editModes,
                  isPasswordEdit: false
                };
              });
            }}
            type="button"
          >
            Отмена
          </Button>
        </Form>
      </Formik>
    </>
  );
}
