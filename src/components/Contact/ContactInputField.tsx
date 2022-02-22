export interface ContactInputFieldProps {
  title: string;
  id: string;
  placeholder: string | undefined;
}

export const ContactInputField = (props: ContactInputFieldProps) => {
  const { title, id, placeholder } = props;
  return (
    <div className="form-floating mb-3">
      <input
        className="form-control"
        id={id}
        type="text"
        placeholder={placeholder}
        data-sb-validations="required"
      />
      <label htmlFor={id}>{title}</label>
      <div className="invalid-feedback" data-sb-feedback={title + ":required"}>
        A {id} is required.
      </div>
    </div>
  );
};
