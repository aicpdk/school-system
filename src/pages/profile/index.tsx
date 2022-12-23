import type { NextPage } from "next";
import { WithPageProtection } from "../../server/middlewares/WithPageProtection";

const ProfilePage: NextPage = () => {
  return <div>Profile</div>;
};

export default ProfilePage;

export const getServerSideProps = WithPageProtection(async () => {
  return {
    props: {},
  };
});
