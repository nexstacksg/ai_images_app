import UpdateImage from "@/components/shared/UpdateImage";

const Page = async ({ params: { id } }: SearchParamProps) => {
  return (
    <>
      <UpdateImage imageId={id} />
    </>
  );
};

export default Page;
