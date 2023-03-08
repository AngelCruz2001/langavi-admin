import React, { Children, ReactElement, useEffect, useId, useRef } from "react";
import styles from "./Table.module.scss";
import { Line } from "../line/Line";
import { v4 as uuid } from "uuid";
import { Button, Svg } from "@/components";

interface ITableProps {
  children: ReactElement<any>;
  proportion: string[];
  headers: string[];
  centerRows: boolean[];
  itemsName: string;
  pagination: {
    total: number;
    currentItems: number;
    perPage: number;
    pagesNumber: number;
    itemsName: string;
    onChange: (page: number) => void;
  };
}

interface ITableRowProps {
  children: React.ReactNode;
  onClick?: (e: any) => void;
}

interface ITableComposition {
  children: React.ReactNode;
}

export const Table = ({
  children,
  headers,
  proportion,
  centerRows,
  pagination,
}: ITableProps) => {
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
    // Quit the hover on the line, the row the one with the same id
    const id = e.currentTarget.id;
    const cells = document.querySelectorAll(`#${id}`);
    cells.forEach((cell) => {
      cell.classList.remove(styles.hover);
    });
  };

  return (
    <div className={styles.table}>
      <div className={styles.content}>
        {headers.map((header, indexHeader) => (
          <div
            key={header}
            className={styles.column}
            style={{
              width: proportion[indexHeader],
            }}
          >
            <div
              className={styles.header}
              style={{
                justifyContent: centerRows[indexHeader]
                  ? "center"
                  : "flex-start",
              }}
            >
              <p>{header}</p>
            </div>
            {arrayChildren.map((child: ReactElement<any>, index: number) => (
              <div
                key={`${uuid()}`}
                onMouseOver={handleOver}
                onMouseLeave={handleLeave}
                id={`child-${index}-cell`}
                className={styles.cell}
                style={{
                  justifyContent: centerRows[indexHeader]
                    ? "center"
                    : "flex-start",
                }}
                {...child.props}
              >
                {React.cloneElement(child.props.children[indexHeader], {
                  id: `child-${index}-cell`,
                  ...child.props.children[indexHeader].props,
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Pagination {...pagination} />
    </div>
  );
};

const Row = ({ children, ...props }: ITableRowProps) => {
  return (
    <div className={styles.row} {...props}>
      {children}
    </div>
  );
};
const Cell = ({ children, ...props }: ITableComposition) => {
  return <>{children}</>;
};

const Pagination = ({
  total,
  currentItems,
  perPage,
  pagesNumber,
  itemsName,
  onChange,
}: {
  total: number;
  currentItems: number;
  perPage: number;
  pagesNumber: number;
  itemsName: string;
  onChange: (page: number) => void;
}) => {
  const actualPage = 1;

  const previousPage = () => {
    if (actualPage > 1) {
      onChange(actualPage - 1);
    }
  };

  const nextPage = () => {
    if (actualPage < pagesNumber) {
      onChange(actualPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.indicators}>
        <p>
          {currentItems > 0 ? 1 : 0} - {currentItems} de {total} {itemsName}
        </p>
      </div>
      <div className={styles.pages}>
        <p>
          {actualPage} de {pagesNumber}
        </p>
        <div
          className={`${styles.buttons}
        ${
          actualPage === pagesNumber || pagesNumber === 0 ? styles.disabled : ""
        }
        `}
        >
          <Button onClick={previousPage} withIcon iconName="left-arrow" />
          <Button onClick={nextPage} withIcon iconName="right-arrow" />
        </div>
      </div>
    </div>
  );
};

Table.Row = Row;
Table.Cell = Cell;
