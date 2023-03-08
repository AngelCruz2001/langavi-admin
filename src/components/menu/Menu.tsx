import styles from "./Menu.module.scss";
import { Button, Svg } from "@/components";

interface IMenuProps {}

export const Menu = (props: IMenuProps) => {
  const handleOpenOptions = () => {
    console.log("open options");
  };

  return (
    <Button onClick={handleOpenOptions}>
      <div className={styles.menu}>
        <Svg iconName="ellipsis-horizontal" />
      </div>
    </Button>
  );
};
