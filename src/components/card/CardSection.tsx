import styles from "./Card.module.scss";

interface ICardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardSection = ({
  children,
  className,
  ...props
}: ICardSectionProps) => {
  return (
    <div className={`${styles.cardSection} ${className} `} {...props}>
      {children}
    </div>
  );
};
