import styles from "./Details.module.scss";

interface IListProps {
  listTitle: string;
  data: {
    label: string;
    value: string;
  }[];
  styles?: React.CSSProperties;
}

export const List = (props: IListProps) => {
  return (
    <div className={styles.list} style={props.styles}>
      <p>{props.listTitle}</p>
      <ul>
        {props.data.map((item, index) => (
          <li key={index}>
            <p>{item.label}</p>
            <p>{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
