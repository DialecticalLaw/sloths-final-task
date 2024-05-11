import { useState } from 'react';
import { Field } from 'formik';
import styles from './PasswordInput.module.css';
import type { InputProps } from '../../UnivComponents.interfaces';
import visible from '../../../../assets/img/visible.svg';
import noVisible from '../../../../assets/img/novisible.svg';

interface VisibilityIconProps {
  togglePasswordVisibility: () => void;
  passwordVisibility: boolean;
}

export const VisibilityIcon = ({ togglePasswordVisibility, passwordVisibility }: VisibilityIconProps) => {
  return (
    <button type="button" onClick={togglePasswordVisibility} className={styles.password_view}>
      <img src={passwordVisibility ? visible : noVisible} alt="visibility icon" />
    </button>
  );
};

export function PasswordInput({ name, placeholder, children }: InputProps) {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevShowPassword: boolean) => !prevShowPassword);
  };

  return (
    <label className={styles.label}>
      <Field
        className={styles.field}
        name={name}
        type={passwordVisibility ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <VisibilityIcon
        togglePasswordVisibility={togglePasswordVisibility}
        passwordVisibility={passwordVisibility}
      />
      <div className={styles.line} />
      {children}
    </label>
  );
}
