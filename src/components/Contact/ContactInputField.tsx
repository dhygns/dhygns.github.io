import React from "react";

export interface ContactInputFieldProps {
  title: string;
  id: string;
  type: string;
  style?: any;
  placeholder: string | undefined;
  onReadyToSubmit: (e: boolean) => void;
}

export const ContactInputField = (props: ContactInputFieldProps) => {
  const [isEmpty, setIsEmpty] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("");
  const { title, id, placeholder, type, style, onReadyToSubmit } = props;

  const onTextChanged = (e: any) => {
    setText(e.target.value);
    onReadyToSubmit(e.target.value.length > 0);
  };

  return (
    <div
      className="form-floating mb-3"
      onBlur={() => {
        setIsEmpty(text.length === 0);
      }}
    >
      {type === "textarea" ? (
        <textarea
          className="form-control"
          id={id}
          style={style}
          placeholder={placeholder}
          onChange={onTextChanged}
        />
      ) : (
        <input
          className="form-control"
          id={id}
          type={type}
          style={style}
          placeholder={placeholder}
          onChange={onTextChanged}
        />
      )}

      <label>{title}</label>
      <div
        className="invalid-feedback"
        style={{ display: isEmpty ? "block" : "none" }}
      >
        "{title}" is required.
      </div>
    </div>
  );
};
