import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import { useSession } from "next-auth/react";

type NavigationItem = {
  href: string;
  label: string;
  icon?: string;
};

type NavigationProps = {
  items: NavigationItem[];
};

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  if (session.status === "unauthenticated") return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="h-16 w-full bg-white shadow-lg">
      <div className="flex h-full w-full items-center justify-between px-6">
        <IoMenu
          className="hover:curser-pointer"
          onClick={toggleMenu}
          size={28}
        />
        <Image
          className="hover:cursor-pointer"
          onClick={() => router.push("/")}
          alt="aicp logo"
          src={"/aicp_logo.png"}
          width={40}
          height={0}
        />
        <ProfileIcon
          selected={router.pathname === "/profile"}
          onClick={() => router.push("/profile")}
        />
      </div>
    </nav>
  );
};

const ProfileIcon: React.FC<{
  selected?: boolean;
  onClick: () => void;
}> = ({ selected, onClick }) => {
  return (
    <div onClick={onClick} className="hover:cursor-pointer">
      {selected ? (
        <RiAccountCircleFill size={32} />
      ) : (
        <RiAccountCircleLine size={32} />
      )}
    </div>
  );
};
