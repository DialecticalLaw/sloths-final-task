import errorImage from '../../../assets/img/404.png';
import styles from './Error.module.css';
import Header from '../../Header/Header';
function ErrorPage() {
  return (
    <>
      <Header />
      <section className={styles.error_page}>
        <img src={errorImage} alt={'Not found page'} className={styles.error_image} />
      </section>
    </>
  );
}
export default ErrorPage;
