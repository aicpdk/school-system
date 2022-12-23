import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: string;
};

export const Link: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <NextLink href={href} passHref className="text-blue-500 ">
      {children}
    </NextLink>
  );
};
