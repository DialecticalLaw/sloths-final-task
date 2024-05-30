import { Form, Formik } from 'formik';
import type { BillingAddress, EditorProps } from '../../Main.interfaces';
import { Button } from '../../../univComponents/Button/Button';
import { ProfileAddress } from './ProfileAddress/ProfileAddress';
import { EditorTitle } from '../EditorTitle/EditorTitle';
import { AddressSchema } from '../../validationSchemes';
import searchIcon from '../../../../assets/img/search.svg';
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
        <>
          <p className={styles.empty_info}>
            Добавьте адреса, иначе нам придется искать вас методом &ldquo;проб и почтовых голубей&ldquo;
          </p>
          <img className={styles.search_icon} src={searchIcon} alt="empty"></img>
        </>
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
                <ProfileAddress customerData={customerData} addressId={address.id} index={index} />
              </Form>
            </Formik>
          );
        })
      )}
    </>
  );
}
