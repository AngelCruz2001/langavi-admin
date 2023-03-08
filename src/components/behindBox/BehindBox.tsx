import styles from "./BehindBox.module.scss";
import { Card } from "@/components";

interface IBehindBoxProps {}

export const BehindBox = ({
  children,
}: React.PropsWithChildren<IBehindBoxProps>) => {
  return (
    <div className={styles.behindBox}>
      <Card
        style={{
          minWidth: "100%",
          padding: "0.5rem",
          alignItems: "flex-start",
          overflow: "initial",
        }}
      >
        {children}
      </Card>
    </div>
  );
};
