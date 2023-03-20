import { useFormikContext } from "formik";
import styles from "./Input.module.scss";
import { Button } from "@/components";

interface ITypePickerProps {
  name: string;
  label: string;
  types: {
    label: string;
    value: string;
  }[];
}

export const TypePicker = (props: ITypePickerProps) => {
  const { setFieldValue, getFieldMeta } = useFormikContext();

  const handleSetType = (type: string) => {
    setFieldValue(props.name, type);
    console.log(getFieldMeta(props.name).value);
  };

  return (
    <div className={styles.typePicker}>
      <label>{props.label}</label>
      <div className={styles.elementsContainer}>
        {props.types.map((type) => (
          <span
            key={type.value}
            className={`
                ${styles.type}
                ${
                  getFieldMeta(props.name).value === type.value
                    ? styles.active
                    : ""
                }
            `}
            onClick={() => handleSetType(type.value)}
          >
            {type.label}
          </span>
        ))}
      </div>
    </div>
  );
};
