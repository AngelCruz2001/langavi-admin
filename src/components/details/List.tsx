import styles from "./Details.module.scss";

interface IListProps {}

export const List = (props: IListProps) => {
  return (
    <div className={styles.List}>
      <h1>List</h1>
    </div>
  );
};
