import styles from "./Card.module.scss";

interface ICardHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  center?: boolean;
}

export const CardHeader = ({
  children,
  className,
  style,
  center = false,
}: ICardHeaderProps) => {
  return (
    <div
      className={`${styles.cardHeader} ${className}`}
      style={{
        justifyContent: center ? "center" : "flex-start",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
