import styles from "./Button.module.scss";
import { Svg } from "@/components";

interface IButtonProps {
  children?: React.ReactNode;
  withIcon?: boolean;
  iconName?: string;
  border?: boolean;
  onClick: (e: any) => void;
}

export const Button = ({
  children,
  withIcon = false,
  iconName = "plus",
  border,
  onClick,
}: React.PropsWithChildren<IButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${withIcon ? styles.withIcon : ""} ${
        border ? styles.border : ""
      }`}
    >
      {withIcon && <Svg iconName={iconName} />}
      {children}
    </button>
  );
};
