import styles from "./Details.module.scss";

interface IListProps {
  listTitle: string;
  data: {
    label: string;
    value: string | number;
  }[];
  styles?: React.CSSProperties;
}

export const List = (props: IListProps) => {
  return (
    <div className={styles.list} style={props.styles}>
      <p className={styles.title}>{props.listTitle}</p>
      <ul>
        {props.data.map((item, index) => (
          <li key={index}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.value}>{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
