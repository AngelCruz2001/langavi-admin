import { useState } from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";

interface ISubmitButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: (data: any) => void;
  position?: "left" | "right";
  variant?: "submit" | "cancel" | "login";
  disabled?: boolean;
  data?: any;
  loading?: boolean;
}

export const SubmitButton = ({
  children,
  type = "submit",
  onClick,
  position = "right",
  variant = "submit",
  disabled = false,
  loading = false,
  data = {},
}: React.PropsWithChildren<ISubmitButtonProps>) => {
  return (
    <button
      className={`${styles.submitButton} ${styles[variant]}`}
      style={{
        float: "right",
      }}
      onClick={() => {
        onClick && onClick(data);
      }}
      type={type}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear", repeat: Infinity }}
          className={styles.loading}
        />
      ) : (
        children
      )}
    </button>
  );
};
