import classNames from "classnames";

type ButtonProps = {
  children: string;
  type?: "outlined" | "filled" | "text";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  widthFull?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "filled",
  onClick,
  widthFull,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={classNames("rounded-md py-2 px-4", {
        "w-full": widthFull,
        "bg-blue-500 text-white": type === "filled",
        "border-solid border-blue-500 bg-white text-blue-500": type === "text",
        "py-0 px-0 text-blue-500": type === "text",
      })}
    >
      {children}
    </button>
  );
};
