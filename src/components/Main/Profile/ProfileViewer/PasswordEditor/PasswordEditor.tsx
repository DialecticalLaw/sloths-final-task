import { Button } from '../../../../univComponents/Button/Button';
import passwordIcon from '../../../../../assets/img/change_password.svg';
import { Form, Formik } from 'formik';
import styles from './PasswordEditor.module.css';
import { Input } from '../../../../univComponents/CustomForm/Input/Input';
import type { PasswordEditorValues } from '../../../Main.interfaces';
import { PasswordEditorSchema } from '../../../validationSchemes';

export function PasswordEditor() {
  const initialValues: PasswordEditorValues = {
    currentPassword: '',
    newPassword: ''
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
        validationSchema={PasswordEditorSchema}
      >
        <Form className={styles.form}>
          <h2 className={styles.title}>Изменение пароля</h2>
          <Input placeholder="Текущий пароль" name="currentPassword" type="password" />
          <Input placeholder="Новый пароль" name="newPassword" type="password" />
          <Button classes={[styles.submit_btn]} type="submit">
            Сохранить
          </Button>
        </Form>
      </Formik>
    </>
  );
}
