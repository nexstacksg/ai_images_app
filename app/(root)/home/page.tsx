import HomePage from "@/components/shared/HomePage";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  return <HomePage page={page} />;
};

export default Home;
