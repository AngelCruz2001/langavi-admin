import styles from "./Text.module.scss";

interface ITitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: React.PropsWithChildren<ITitleProps>) => {
  return <p className={styles.title}>{children}</p>;
};
