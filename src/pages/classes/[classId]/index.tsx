import type { InferGetServerSidePropsType, NextPage } from "next";
import { Link } from "../../../components/link";
import { WithPageProtection } from "../../../server/middlewares/WithPageProtection";
import { trpc } from "../../../utils/trpc";

export const ClassPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data } = trpc.class.getClass.useQuery({
    id,
  });

  const teacherNames = data?.teachers
    ?.map((teacher) => teacher.name)
    .join(", ");

  return (
    <main className="page flex flex-col gap-5">
      <div className="mt-6 flex gap-2 text-sm font-normal">
        <Link href="/classes">Classes</Link>
        <p>{">"}</p>
        <p>{data?.name}</p>
      </div>
      <h1 className="text-2xl font-normal">{data?.name}</h1>
      <div>
        <label className="text-sm font-light text-gray-400">Teachers</label>
        <p>{teacherNames || "--"}</p>
      </div>
      <div>
        <label className="text-sm font-light text-gray-400">Students</label>
        <p>{data?.students?.length}</p>
      </div>
      <div>
        <label className="text-sm font-light text-gray-400">Schedules</label>
        <div className="flex flex-col gap-1">
          {/* {data?.map((schedule, index) => {
            return (
              <div key={"schedule-" + index}>
                <p>{schedule.day}</p>
                <p>
                  {schedule.start} - {schedule.end}
                </p>
              </div>
            );
          })} */}
        </div>
      </div>
    </main>
  );
};

export default ClassPage;

export const getServerSideProps = WithPageProtection(async (context) => {
  const classId = context.params?.classId;

  if (!classId) {
    return {
      notFound: true,
      props: {
        id: "",
      },
    };
  }

  return {
    props: {
      id: classId,
    },
  };
});
