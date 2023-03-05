import styles from "./Status.module.scss";

interface StatusProps {
  status: number;
  options?: string[];
}

export const Status = ({
  status = 0,
  options = ["Oculto", "Publicado"],
}: StatusProps) => {
  return (
    <div className={styles.status}>
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
