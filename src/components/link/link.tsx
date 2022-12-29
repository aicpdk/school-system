import classNames from "classnames";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  isBold?: boolean;
  children: string;
  isSkeleton?: boolean;
};

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  isBold,
  isSkeleton,
}) => {
  if (isSkeleton) {
    return <div className="h-3 w-12 rounded bg-gray-200" />;
  }

  return (
    <NextLink
      href={href}
      passHref
      className={classNames("text-blue-500", {
        "font-bold": isBold,
      })}
    >
      {children}
    </NextLink>
  );
};
