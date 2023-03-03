import styles from "./Card.module.scss";
import { Line } from "@/components";

interface ICardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  line?: boolean;
}

export const CardSection = ({
  children,
  className,
  line = true,
  ...props
}: ICardSectionProps) => {
  return (
    <div className={`${styles.cardSection} ${className} `} {...props}>
      {children}
      {line && <Line />}
    </div>
  );
};
