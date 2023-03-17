import { useEffect, useRef } from "react";
import styles from "./BehindBox.module.scss";
import { Card } from "@/components";
import { createPortal } from "react-dom";

interface IBehindBoxProps {
  show?: boolean;
  setShow?: (show: boolean) => void;
  customStyles?: React.CSSProperties;
  noPadding?: boolean;
}

export const BehindBox = ({
  children,
  show,
  customStyles,
  noPadding = false,
  setShow = () => {},
}: React.PropsWithChildren<IBehindBoxProps>) => {
  // When the user clicks anywhere outside of the modal, close it
  const modalRef = useRef<HTMLDivElement>(null);
  const ref = useRef<Element | null>(null);
  const containerBehindRef = useRef<HTMLDivElement>(null);
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
  }, [show, setShow]);

  // show behind the parent component but without the scope of the parent component

  // Get position of parent component
  useEffect(() => {
    const parent =
      containerBehindRef.current?.parentElement?.getBoundingClientRect();
    // Get total width of page to calculate the position of the modal
    const totalWidth = document.body.getBoundingClientRect().width;

    console.log(parent);
    if (parent && modalRef.current) {
      modalRef.current!.style.top = `${parent.top + 40}px`;

      if (parent.left + 170 > totalWidth) {
        modalRef.current!.style.left = `${totalWidth - 170}px`;
      } else {
        modalRef.current!.style.left = `${parent.left}px`;
      }
    }
  }, [modalRef, show]);

  // place behindBox in the same position as parent component

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
  }, []);

  if (!show) return null;

  return ref.current ? (
    <div ref={containerBehindRef}>
      {createPortal(
        <div
          id="behindBox"
          className={styles.behindBox}
          style={customStyles}
          ref={modalRef}
        >
          <Card
            noPadding={noPadding}
            style={{
              minWidth: "100%",
              padding: "0.5rem",
              alignItems: "flex-start",
              overflow: "initial",
            }}
          >
            {children}
          </Card>
        </div>,
        ref.current
      )}
    </div>
  ) : null;
};
