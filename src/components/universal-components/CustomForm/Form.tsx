import { Form } from 'formik';
import styles from './Form.module.css';

export function CustomForm({ children }: { children: JSX.Element }) {
  return <Form className={styles.form}>{children}</Form>;
}
