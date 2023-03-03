import React, { Children, ReactElement, useEffect, useId, useRef } from "react";
import styles from "./Table.module.scss";
import { Line } from "../line/Line";
import { v4 as uuid } from "uuid";

interface ITableProps {
  children: ReactElement<any>;
  proportion: string[];
  headers: string[];
}

interface ITableComposition {
  children: React.ReactNode;
}

export const Table = ({ children, headers, proportion }: ITableProps) => {
  const arrayChildren =
    children.props && Children.toArray(children.props.children);

  const handleOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //  Make a hover on the line, the row the one with the same id
    const id = e.currentTarget.id;
    const cells = document.querySelectorAll(`#${id}`);
    cells.forEach((cell) => {
      cell.classList.add(styles.hover);
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    const cells = document.querySelectorAll(`#${id}`);
    cells.forEach((cell) => {
      cell.classList.remove(styles.hover);
    });
  };

  return (
    <div className={styles.table}>
      {headers.map((header, indexHeader) => (
        <div
          key={header}
          className={styles.content}
          style={{
            width: proportion[indexHeader],
          }}
        >
          <div className={styles.header}>
            <p>{header}</p>
          </div>

          {arrayChildren.map((child: ReactElement<any>, index: number) => (
            <div
              key={`${uuid()}`}
              onMouseOver={handleOver}
              onMouseLeave={handleLeave}
              id={`child-${index}-cell`}
              className={styles.cell}
            >
              {Children.toArray(child.props.children)[indexHeader]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Row = ({ children, ...props }: ITableComposition) => {
  return <div className={styles.row}>{children}</div>;
};
const Cell = ({ children, ...props }: ITableComposition) => {
  return (
    <div className={styles.cell} {...props}>
      {children}
    </div>
  );
};

Table.Row = Row;
Table.Cell = Cell;
