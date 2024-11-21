import UserProfile from "@/components/shared/UserProfile";

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  return <UserProfile page={page} />;
};

export default ProfilePage;
