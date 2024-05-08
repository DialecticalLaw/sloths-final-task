import { Field } from 'formik';
import styles from './Input.module.css';

export function Input({
  name,
  type,
  placeholder
}: {
  placeholder: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'search' | 'number';
}) {
  return <Field className={styles.field} name={name} type={type} placeholder={placeholder}></Field>;
}
