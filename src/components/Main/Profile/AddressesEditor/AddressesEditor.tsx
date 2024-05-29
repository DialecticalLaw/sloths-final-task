import { Form, Formik } from 'formik';
import type { BillingAddress, EditorProps } from '../../Main.interfaces';
import { Button } from '../../../univComponents/Button/Button';
import styles from './AddressesEditor.module.css';

export function AddressesEditor({ customerData, setEditMode }: EditorProps) {
  console.log(customerData);
  const addresses = customerData.addresses;
  console.log(addresses);

  return (
    <>
      <Button
        classes={[styles.button]}
        type="button"
        onClick={() => {
          setEditMode((editModes) => {
            return {
              ...editModes,
              isAddressesEdit: false
            };
          });
        }}
      >
        Вернуться назад
      </Button>

      {!addresses.length ? (
        <p>Добавьте адреса, иначе мы будем вынуждены отправить вам почтового космо-голубя со счетом</p>
      ) : (
        addresses.map((address) => {
          if (address.country !== 'RU' && address.country !== 'BY') throw new Error('wrong country name');

          const initialValues: BillingAddress = {
            country: address.country || '',
            city: address.city || '',
            street: address.streetName || '',
            postalCode: address.postalCode || '',
            isDefault: false
          };

          return (
            <Formik
              key={address.id}
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form></Form>
            </Formik>
          );
        })
      )}
    </>
  );
}
