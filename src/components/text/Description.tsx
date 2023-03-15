import styles from "./Text.module.scss";

interface IDescriptionProps {
  children: React.ReactNode;
}

export const Description = ({
  children,
}: React.PropsWithChildren<IDescriptionProps>) => {
  return (
    <div className={styles.description}>
      <p>{children}</p>
    </div>
  );
};
