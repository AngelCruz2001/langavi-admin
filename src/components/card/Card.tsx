
interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}


export const Card = ({ children, className, ...props }: ICardProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
