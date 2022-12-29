import { Title } from "../title/title";

type ClassCardProps = {
  title: string;
  teacher: string;
  nextAttendance: Date;
  onClick: () => void;
  isSkeleton?: boolean;
};

export const ClassCard: React.FC<ClassCardProps> = ({
  nextAttendance,
  teacher,
  title,
  onClick,
  isSkeleton,
}) => {
  if (isSkeleton) {
    return <ClassCardSkeleton />;
  }

  return (
    <div
      className="flex h-28 min-w-full flex-col justify-between rounded-md border-l-8 border-l-orange-400 bg-white px-3 py-3 shadow-md hover:cursor-pointer"
      onClick={onClick}
    >
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <h3 className="text-sm">Teacher: {teacher}</h3>
      </div>
      <div className="flex gap-1">
        <p className="text-sm">Next Attendance:</p>
        <p className="text-sm font-bold">
          {nextAttendance.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const ClassCardSkeleton = () => {
  return (
    <div className="flex h-28 min-w-full flex-col justify-between rounded-md border-l-8 border-l-orange-400 bg-white px-3 py-3 shadow-md">
      <div>
        <Title isSkeleton={true} />
      </div>
      <div className="flex gap-1">
        <Title isSkeleton />
        <Title isSkeleton />
      </div>
    </div>
  );
};
