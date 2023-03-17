import { toast } from "react-hot-toast";
import styles from "./Text.module.scss";

interface ICopyOnClickProps {}

export const CopyOnClick = ({
  children,
}: React.PropsWithChildren<ICopyOnClickProps>) => {
  return (
    <span
      className={styles.copyOnClick}
      onClick={(e) => {
        toast.success("Copiado al portapapeles");
        const text = e.currentTarget.innerText;
        navigator.clipboard.writeText(text);
      }}
    >
      {children}
    </span>
  );
};
