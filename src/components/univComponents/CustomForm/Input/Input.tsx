import { useState } from 'react';
import { Field } from 'formik';
import type { InputProps } from '../../UnivComponents.interfaces';
import { PasswordButton } from '../PasswordButton/PasswordButton';
import styles from './Input.module.css';

// export function Input({ name, type, placeholder, children }: InputProps) {
//   return (
//     <label className={styles.label}>
//       <Field className={styles.field} name={name} type={type} placeholder={placeholder} />
//       <div className={styles.line} />
//       {children}
//     </label>
//   );
// }

export function Input({ name, type, placeholder, children }: InputProps) {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevShowPassword: boolean) => !prevShowPassword);
  };

  return (
    <label className={styles.label}>
      <Field
        className={styles.field}
        name={name}
        type={type === 'password' ? (passwordVisibility ? 'text' : 'password') : type}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <PasswordButton
          togglePasswordVisibility={togglePasswordVisibility}
          passwordVisibility={passwordVisibility}
        />
      )}
      <div className={styles.line} />
      {children}
    </label>
  );
}
