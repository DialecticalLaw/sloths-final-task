// import { Field } from 'formik';
// import styles from './Input.module.css';
// import type { InputProps } from '../../UnivComponents.interfaces';

// export function Input({ name, type, placeholder, children }: InputProps) {
//   return (
//     <label className={styles.label}>
//       <Field className={styles.field} name={name} type={type} placeholder={placeholder} />
//       <div className={styles.line} />
//       {children}
//     </label>
//   );
// }

import { useState } from 'react';
import { Field } from 'formik';
import styles from './Input.module.css'; // Стили из вашего существующего компонента Input
import { VisibilityIcon } from '../PasswordInput/PasswordInput';

interface InputProps {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'search' | 'number';
  children?: React.ReactNode;
}

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
      {type === 'password' && ( // Добавляем кнопку переключения видимости только для типа 'password'
        <VisibilityIcon
          togglePasswordVisibility={togglePasswordVisibility}
          passwordVisibility={passwordVisibility}
        />
      )}
      <div className={styles.line} />
      {children}
    </label>
  );
}
