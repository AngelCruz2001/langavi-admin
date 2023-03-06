import styles from "./Status.module.scss";

interface StatusProps {
  status: number;
  options?: string[];
  style?: React.CSSProperties;
  class?: string;
}

export const Status = ({
  status = 0,
  options = ["Oculto", "Publicado"],
  ...props
}: StatusProps) => {
  return (
    <div className={`${styles.status} ${props.class}`} {...props}>
      <div
        className={`${styles.statusCircle} ${
          status ? styles.success : styles.error
        }
          `}
      />
      <p>{options[status]}</p>
    </div>
  );
};
