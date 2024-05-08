import styles from './Button.module.css';

export function Button({ children, type }: { children: string; type: 'submit' | 'reset' | 'button' }) {
  return (
    <button className={styles.button} type={type}>
      {children}
      <span className={styles.underline}>_</span>
    </button>
  );
}
