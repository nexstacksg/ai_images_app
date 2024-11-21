import ImageDetail from "@/components/shared/ImageDetail";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  return <ImageDetail id={id} />;
};

export default ImageDetails;
