import styles from "./Text.module.scss";

interface IDescriptionProps {
  children: React.ReactNode;
}

export const Description = ({
  children,
}: React.PropsWithChildren<IDescriptionProps>) => {
  return <p className={styles.description}>{children}</p>;
};
