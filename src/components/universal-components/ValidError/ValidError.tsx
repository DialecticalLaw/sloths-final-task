import { ErrorMessage } from 'formik';

export function ValidError({ name }: { name: string }) {
  return <ErrorMessage name={name}></ErrorMessage>;
}
