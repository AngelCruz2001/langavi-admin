import styles from "./Card.module.scss";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  styles?: React.CSSProperties;
  noPadding?: boolean;
  center?: boolean;
}

export const Card = ({
  children,
  className,
  fullHeight,
  center,
  ...props
}: ICardProps) => {
  return (
    <div
      className={styles.cardContainer}
      style={{
        padding: props.noPadding ? "0" : "",
      }}
    >
      <div
        style={props.styles}
        className={`${styles.card} ${className}
    ${fullHeight ? styles.fullHeight : ""}
    `}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
