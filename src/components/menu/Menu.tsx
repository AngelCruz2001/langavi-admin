import React, { useState } from "react";
import styles from "./Menu.module.scss";
import { BehindBox, Button, Svg } from "@/components";

interface IMenuProps {
  children: React.ReactNode;
}

export const Menu = (props: IMenuProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenOptions = () => {
    setShowModal(true);
    console.log("open options");
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleOpenOptions}>
        <div className={styles.menu}>
          <Svg iconName="ellipsis-horizontal" />
        </div>
      </Button>

      <BehindBox
        show={showModal}
        setShow={setShowModal}
        customStyles={{
          left: "-4rem",
        }}
      >
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            onClick: () => {
              if (React.isValidElement(child)) {
                child.props.onClick();
              }
              setShowModal(false);
            },
          })
        )}
      </BehindBox>
    </div>
  );
};
