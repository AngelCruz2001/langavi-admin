import styles from "./Svg.module.scss";

export const Svg = ({ iconName }: { iconName: string }) => {
  return (
    <svg className={styles.svg}>
      <use href={`/svg/${iconName}.svg#${iconName}`} />
    </svg>
  );
};
