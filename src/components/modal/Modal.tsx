import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

interface IModalProps {
  isOpen: boolean;
}

export const Modal = ({
  children,
  isOpen,
}: React.PropsWithChildren<IModalProps>) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return mounted && ref.current ? (
    <>
      {isOpen &&
        createPortal(
          <div className={styles.modal} onClick={handleContentClick}>
            {children}
          </div>,
          ref.current
        )}
    </>
  ) : null;
};
