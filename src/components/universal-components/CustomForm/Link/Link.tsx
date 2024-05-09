import styles from './Link.module.css';

export function Link({ children, text }: { children: string; text: string }) {
  return (
    <p className={styles.linkWrapper}>
      {text}&nbsp;
      <a className={styles.link} href="#">
        {children}
      </a>
    </p>
  );
}
