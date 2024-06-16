import { Button } from '../../../univComponents/Button/Button';
import trashIcon from '../../../../assets/img/trash.svg';
import styles from './ClearCartBtn.module.css';
import { useState } from 'react';

export function ClearCartBtn() {
  const [isShowConfirm, setShowConfirm] = useState(false);

  return (
    <div className={styles.clear_cart_wrapper}>
      <Button onClick={() => setShowConfirm(!isShowConfirm)} type="button">
        <>
          Очистить корзину <img className={styles.trash} src={trashIcon} alt="trash" />
        </>
      </Button>

      <div className={`${styles.confirm_wrapper} ${isShowConfirm ? styles.active : ''}`}>
        <h2 className={styles.confirm_title}>Вы уверены?</h2>
        <Button classes={[styles.confirm_btn]} type="button" minimal>
          Очистить
        </Button>
        <Button onClick={() => setShowConfirm(false)} classes={[styles.cancel_btn]} type="button" minimal>
          Отмена
        </Button>
      </div>
    </div>
  );
}
