import styles from "./Status.module.scss";
import React, { useEffect, useMemo } from "react";
import { Card, Modal, Button } from "@/components";
import { BehindBox } from "../behindBox/BehindBox";
import { orderStatusTypeArray } from "@/interfaces";

interface StatusProps {
  status: number;
  options?: string[];
  style?: React.CSSProperties;
  clickeable?: boolean;
  className?: string;
  onClick?: (status: string) => void;
}

export const Status = ({
  clickeable = false,
  options = orderStatusTypeArray,
  onClick,
  ...props
}: StatusProps) => {
  const [showModal, setShowModal] = React.useState(false);

  const [status, setStatus] = React.useState(props.status);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSetStatus = (status: number) => {
    setShowModal(!showModal);
    setStatus(status);

    onClick && onClick(orderStatusTypeArray[status]);
    console.log(status);
  };

  return (
    <div className={styles.container}>
      {clickeable ? (
        <Button onClick={handleToggleModal}>
          <Content {...props} status={status} options={options} />
        </Button>
      ) : (
        <Content {...props} status={status} options={options} />
      )}

      <BehindBox show={showModal} setShow={setShowModal}>
        {options.map((option, index) => (
          <Button key={index} onClick={() => handleSetStatus(index)}>
            <Content {...props} status={index} options={options} />
          </Button>
        ))}
      </BehindBox>
    </div>
  );
};

interface ContentProps {
  status: number;
  options: string[];
  style?: React.CSSProperties;
  className?: string;
}

const Content = ({ options, status = 0, ...props }: ContentProps) => {
  const styleStatus = useMemo(() => {
    switch (status) {
      case 0:
        return styles.standby;
      case 1:
        return styles.progress;
      case 2:
        return styles.send;
      case 3:
        return styles.delivered;
      default:
        return styles.error;
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
