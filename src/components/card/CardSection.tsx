import styles from "./Card.module.scss";
import { Line } from "@/components";

interface ICardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  line?: boolean;
  fullHeight?: boolean;
}

export const CardSection = ({
  children,
  className,
  line = true,
  fullHeight,
  ...props
}: ICardSectionProps) => {
  return (
    <div
      className={`${styles.cardSection} ${className} ${
        fullHeight ? styles.fullHeightSection : ""
      }`}
      {...props}
    >
      {children}
      {line && <Line />}
    </div>
  );
};
