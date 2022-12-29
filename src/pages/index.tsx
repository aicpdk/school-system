import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ClassCard } from "../components/class-card";
import { Link } from "../components/link";
import { Title } from "../components/title/title";
import { WithPageProtection } from "../server/middlewares/WithPageProtection";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: classes, isLoading } = trpc.class.getClasses.useQuery();
  const router = useRouter();

  return (
    <main className="ml-6 py-6">
      <section className="flex flex-col gap-4 ">
        <div className="flex justify-between">
          <Title isSkeleton={isLoading}>Classes</Title>
          <div className="mr-6">
            <Link isSkeleton={isLoading} href="/classes">
              View All
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute flex w-full gap-3 overflow-auto">
            {classes?.map((data, index) => {
              return (
                <div
                  key={"class-card-" + index}
                  className="min-w-[calc(100%_-_44px)] pb-4"
                >
                  <ClassCard
                    onClick={() => router.push("/classes/" + data.id)}
                    title={data.name}
                    nextAttendance={new Date()}
                    teacher={"unknown"}
                    isSkeleton={isLoading}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps = WithPageProtection(async () => {
  return {
    props: {},
  };
});
