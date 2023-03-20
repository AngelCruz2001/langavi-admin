import styles from "./Button.module.scss";
import { Svg } from "@/components";

interface IButtonProps {
  children?: React.ReactNode;
  withIcon?: boolean;
  iconName?: string;
  border?: boolean;
  variant?: "primary" | "danger";
  onClick: (e: any) => void;
}

export const Button = ({
  children,
  withIcon = false,
  iconName = "plus",
  border,
  variant,
  onClick,
}: React.PropsWithChildren<IButtonProps>) => {
  const buttonClasses = `
    ${styles.button}
    ${withIcon ? styles.withIcon : ""}
    ${border ? styles.border : ""}
    ${variant ? styles[variant] : ""}
    `;
  return (
    <button onClick={onClick} className={buttonClasses}>
      {withIcon && <Svg iconName={iconName} />}
      {children}
    </button>
  );
};
