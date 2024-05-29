import { Form, Formik } from 'formik';
import type { BillingAddress, EditorProps } from '../../Main.interfaces';
import { Button } from '../../../univComponents/Button/Button';
import { ProfileAddress } from './ProfileAddress/ProfileAddress';
import { EditorTitle } from '../EditorTitle/EditorTitle';
import { AddressSchema } from '../../validationSchemes';
import styles from './AddressesEditor.module.css';

export function AddressesEditor({ customerData, setEditMode }: EditorProps) {
  console.log(customerData);
  const addresses = customerData.addresses;
  console.log(addresses);

  return (
    <>
      <EditorTitle>Управление адресами</EditorTitle>
      <Button
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
        <p>Добавьте адреса, иначе мы будем вынуждены отправить вам почтового космоголубя со счётом</p>
      ) : (
        addresses.map((address, index) => {
          if (address.country !== 'RU' && address.country !== 'BY') throw new Error('wrong country name');
          if (!address.id) throw new Error('id is undefined');

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
              validationSchema={AddressSchema}
            >
              <Form className={styles.address_form}>
                <ProfileAddress id={address.id} index={index} />
              </Form>
            </Formik>
          );
        })
      )}
    </>
  );
}
