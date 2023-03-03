import styles from "./Card.module.scss";

interface ICardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: ICardHeaderProps) => {
  return <div className={`${styles.cardHeader} ${className}`}>{children}</div>;
};
