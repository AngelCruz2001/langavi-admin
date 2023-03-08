import { useRouter } from "next/router";
import styles from "./BackArrow.module.scss";
import { Svg } from "@/components";

interface IBackArrowProps {
  backTo: string;
}

export const BackArrow = (props: IBackArrowProps) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.container} onClick={goBack}>
      <Svg iconName="left-arrow" />
      <span>Regresar a {props.backTo}</span>
    </div>
  );
};
