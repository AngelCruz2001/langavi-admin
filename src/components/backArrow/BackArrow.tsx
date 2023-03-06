import styles from "./BackArrow.module.scss";
import { Svg } from "@/components";

interface IBackArrowProps {
  backTo: string;
}

export const BackArrow = (props: IBackArrowProps) => {
  return (
    <div className={styles.container}>
      <Svg iconName="left-arrow" />
      <span>Regresar a {props.backTo}</span>
    </div>
  );
};
