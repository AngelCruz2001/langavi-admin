import styles from "./Status.module.scss";
import React, { useEffect, useMemo } from "react";
import { Card, Modal, Button } from "@/components";
import { BehindBox } from "../behindBox/BehindBox";

interface StatusProps {
  status: number;
  options?: string[];
  style?: React.CSSProperties;
  clickeable?: boolean;
  className?: string;
}

export const Status = ({ clickeable = false, ...props }: StatusProps) => {
  const [showModal, setShowModal] = React.useState(false);

  const [status, setStatus] = React.useState(props.status);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSetStatus = (status: number) => {
    setShowModal(!showModal);
    setStatus(status);
    console.log(status);
  };

  return (
    <div className={styles.container}>
      {clickeable ? (
        <Button onClick={handleToggleModal}>
          <Content {...props} status={status} />
        </Button>
      ) : (
        <Content {...props} status={status} />
      )}

      <BehindBox show={showModal} setShow={setShowModal}>
        {props.options?.map((option, index) => (
          <Button key={index} onClick={() => handleSetStatus(index)}>
            <Content {...props} status={index} />
          </Button>
        ))}
      </BehindBox>
    </div>
  );
};

const Content = ({
  status = 0,
  options = ["Enviado", "Entregado", "Preparando"],
  ...props
}) => {
  const styleStatus = useMemo(() => {
    switch (status) {
      case 0:
        return styles.success;
      case 1:
        return styles.error;
      case 2:
        return styles.progress;
      default:
        return styles.progress;
    }
  }, [status]);

  return (
    <div
      className={`${styles.status} ${
        props.className && styles[props.className]
      }`}
      {...props}
    >
      <div
        className={`${styles.statusCircle} ${styleStatus}
          `}
      />
      <p>{options[status]}</p>
    </div>
  );
};
