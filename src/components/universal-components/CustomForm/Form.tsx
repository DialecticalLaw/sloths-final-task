import { Form } from 'formik';

export function CustomForm({ children }: { children: JSX.Element }) {
  return <Form>{children}</Form>;
}
