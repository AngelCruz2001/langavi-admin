import styles from "./Status.module.scss";
import React, { useMemo } from "react";
import { Button } from "@/components";
import { BehindBox } from "../behindBox/BehindBox";
import { orderStatusTypeArray } from "@/interfaces";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface StatusProps {
  status: string;
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
  status,
  ...props
}: StatusProps) => {
  const [showModal, setShowModal] = React.useState(false);

  const statusNumber = useMemo(() => {
    return options.indexOf(status);
  }, [status, options]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSetStatus = (status: string) => {
    setShowModal(!showModal);

    onClick && onClick(status);
  };

  return (
    <div className={styles.container}>
      {clickeable ? (
        <Button onClick={handleToggleModal}>
          <Content {...props} status={statusNumber} options={options} />
        </Button>
      ) : (
        <Content {...props} status={statusNumber} options={options} />
      )}

      <BehindBox show={showModal} setShow={setShowModal}>
        {options.map((option, index) => (
          <Button key={index} onClick={() => handleSetStatus(option)}>
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
      <p>{capitalizeFirstLetter(options[status])}</p>
    </div>
  );
};
