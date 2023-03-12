import styles from "./Card.module.scss";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  styles?: React.CSSProperties;
}

export const Card = ({
  children,
  className,
  fullHeight,
  ...props
}: ICardProps) => {
  return (
    <div
      style={props.styles}
      className={`${styles.card} ${className}
    ${fullHeight ? styles.fullHeight : ""}
    `}
      {...props}
    >
      {children}
    </div>
  );
};
