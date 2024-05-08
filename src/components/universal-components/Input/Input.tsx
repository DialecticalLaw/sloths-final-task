import { Field } from 'formik';

export function Input({ text, name, type }: { text: string; name: string; type: string }) {
  return (
    <label>
      {text}
      <Field name={name} type={type}></Field>
    </label>
  );
}
