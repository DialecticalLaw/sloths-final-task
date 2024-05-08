import { Field } from 'formik';
import styles from './Input.module.css';

export function Input({
  name,
  type,
  placeholder,
  children
}: {
  placeholder: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'search' | 'number';
  children: JSX.Element;
}) {
  return (
    <label className={styles.label}>
      <Field className={styles.field} name={name} type={type} placeholder={placeholder}></Field>
      <div className={styles.line}></div>
      {children}
    </label>
  );
}
