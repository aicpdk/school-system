type TitleProps = {
  isSkeleton: boolean;
  children: string;
};

export const Title: React.FC<TitleProps> = ({ children, isSkeleton }) => {
  if (isSkeleton) {
    return <div className="h-6 w-32 rounded bg-gray-200" />;
  }
  return <h1 className="text-xl font-bold">{children}</h1>;
};
