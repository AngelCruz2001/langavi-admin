import { ErrorMessage, Field, Formik, useField } from "formik";
import styles from "./Input.module.scss";
import React, { useState } from "react";

interface IInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  width?: string;
  style?: React.CSSProperties;
  withLabel?: boolean;
  withPlaceholder?: boolean;
  inputPadding?: string;
}

export const Input = ({
  name,
  label,
  type = "text",
  placeholder = "",
  options,
  width,
  style,
  withLabel = true,
  withPlaceholder = false,
  inputPadding,
}: IInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  let Input = (
    <Field
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      name={name}
      type={type}
      className={styles.field}
      id={name}
      placeholder={withPlaceholder ? placeholder : ""}
      style={{
        padding: inputPadding ? inputPadding : "",
      }}
    />
  );

  if (type === "select") {
    Input = (
      <Field as="select" name={name} className={styles.field} id={name}>
        {/* Default option  */}
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    );
  }

  return (
    <div
      className={styles.input}
      style={{
        width: width ? width : "100%",
        ...style,
      }}
    >
      {withLabel && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <span
        className={`${styles.fieldContainer} ${
          isFocused ? styles.focused : ""
        }`}
      >
        {Input}
      </span>
      <span className={styles.errorContainer}>
        <ErrorMessage name={name} component="div" className={styles.error} />
      </span>
    </div>
  );
};
