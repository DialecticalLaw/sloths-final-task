import styles from './Title.module.css';

// export function Title({ children }: { children: string }) {
//   return (
//     <>
//       <h2 className={styles.titleAddition}>Welcome to the future</h2>
//       <h1 className={styles.titleMain}>{children}</h1>
//     </>
//   );
// }

export function Title({ mainText, additionText }: { mainText: string; additionText: string }) {
  return (
    <>
      <h2 className={styles.titleAddition}>{additionText}</h2>
      <h1 className={styles.titleMain}>{mainText}</h1>
    </>
  );
}
