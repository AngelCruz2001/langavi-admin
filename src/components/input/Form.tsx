import styles from "./Input.module.scss";

interface IFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({
  children,
  onSubmit,
}: React.PropsWithChildren<IFormProps>) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};

interface IFormInputsProps {
  withGap?: boolean;
}

const FormInputs = ({
  children,
  withGap = true,
}: React.PropsWithChildren<IFormInputsProps>) => {
  {
    return (
      <div
        className={styles.formInputs}
        style={{
          gap: withGap ? "2rem" : ".7rem",
        }}
      >
        {children}
      </div>
    );
  }
};

const FormButtons = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className={styles.formButtons}>{children}</div>;
};

Form.Inputs = FormInputs;
Form.Buttons = FormButtons;
