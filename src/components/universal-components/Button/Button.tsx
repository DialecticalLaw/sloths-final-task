import styles from './Button.module.css';

export function Button({
  children,
  type,
  onClick
}: {
  children: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
      <span className={styles.underline}>_</span>
    </button>
  );
}
