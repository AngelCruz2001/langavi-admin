import React, { useState } from "react";
import styles from "./Input.module.scss";
import { useFormikContext, Field } from "formik";
import { motion, Variants } from "framer-motion";

interface ISwitchProps {
  name: string;
  position?: "left" | "top-right";
}

const animation: Variants = {
  on: {
    x: 26,
  },
  off: {
    x: 1,
  },
};

export const Switch = ({ name, position = "top-right" }: ISwitchProps) => {
  const { setFieldValue, getFieldMeta } = useFormikContext();
  const meta = getFieldMeta(name);
  const [isOn, setIsOn] = useState(meta.value);

  const handleClickSwitch = () => {
    setIsOn(!isOn);
    setFieldValue(name, !isOn);
  };

  const topRightStyles = {
    position: "absolute",
    top: 0,
    right: 0,
  } as React.CSSProperties;

  return (
    <span
      className={`${styles.switch} ${isOn ? styles.checked : ""} `}
      onClick={handleClickSwitch}
      style={topRightStyles}
    >
      <motion.div
        className={styles.switchButton}
        variants={animation}
        initial={isOn ? "on" : "off"}
        animate={isOn ? "on" : "off"}
        transition={{ duration: 0.3 }}
      />
    </span>
  );
};
