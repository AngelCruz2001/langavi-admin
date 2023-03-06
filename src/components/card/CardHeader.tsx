import styles from "./Card.module.scss";

interface ICardHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CardHeader = ({
  children,
  className,
  style,
}: ICardHeaderProps) => {
  return (
    <div className={`${styles.cardHeader} ${className}`} style={style}>
      {children}
    </div>
  );
};
