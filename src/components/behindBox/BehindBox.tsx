import { useEffect, useRef } from "react";
import styles from "./BehindBox.module.scss";
import { Card } from "@/components";

interface IBehindBoxProps {
  show?: boolean;
  setShow?: (show: boolean) => void;
  customStyles?: React.CSSProperties;
}

export const BehindBox = ({
  children,
  show,
  customStyles,
  setShow = () => {},
}: React.PropsWithChildren<IBehindBoxProps>) => {
  // When the user clicks anywhere outside of the modal, close it
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        document.getElementById("behindBox") &&
        !document.getElementById("behindBox")!.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  // show behind the parent component but without the scope of the parent component

  // Get position of parent component
  useEffect(() => {
    const parent = modalRef.current?.parentElement?.getBoundingClientRect();
    if (parent && modalRef.current) {
      console.log(modalRef);
      modalRef.current!.style.top = `${parent.top + 40}px`;
      modalRef.current!.style.left = `${parent.left}px`;
    }
  }, [modalRef, show]);
  // place behindBox in the same position as parent component

  if (!show) return null;

  return (
    <div
      id="behindBox"
      className={styles.behindBox}
      style={customStyles}
      ref={modalRef}
    >
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
