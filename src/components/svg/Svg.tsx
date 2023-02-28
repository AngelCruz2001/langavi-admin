export const Svg = ({ iconName }: { iconName: string }) => {
  return (
    <svg>
      <use href={`/svg/${iconName}.svg#${iconName}`} />
    </svg>
  );
};
