import { Button } from '../../../../univComponents/Button/Button';
import { Checkbox } from '../../../../univComponents/Checkbox/Checkbox';
import { Input } from '../../../../univComponents/CustomForm/Input/Input';
import { CountrySelect } from '../../../../univComponents/CustomForm/RegisterAddress/CountrySelect/CountrySelect';
import styles from './ProfileAddress.module.css';

export function ProfileAddress({ index }: { index: number }) {
  return (
    <fieldset className={styles.address}>
      <legend className={styles.legend}>Адрес {index + 1}</legend>
      <CountrySelect name="country"></CountrySelect>
      <Input name="city" type="text" placeholder="Город"></Input>
      <Input name="street" type="text" placeholder="Улица"></Input>
      <Input name="postalCode" type="text" placeholder="Почтовый индекс"></Input>
      <Checkbox name="isDefault">Использовать по умолчанию</Checkbox>

      <div className={styles.buttons}>
        <Button minimal={true} type="submit">
          Сохранить
        </Button>
        <Button minimal={true} type="button">
          Отмена
        </Button>
      </div>
    </fieldset>
  );
}
