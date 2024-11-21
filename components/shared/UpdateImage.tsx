"use client";
import { transformationTypes } from "@/constants";
import Header from "./Header";
import TransformationForm from "./TransformationForm";
import { useEffect, useState } from "react";
import { getImageById } from "@/lib/actions/image.services";
import { ImageData } from "@/types/image.types";

const UpdateImage = (props: { imageId: string }) => {
  const [image, setImage] = useState<ImageData>();

  const fetchImage = async () => {
    const data = await getImageById(props.imageId);
    setImage(data);
  };

  useEffect(() => {
    fetchImage();
  }, [props.imageId]);

  const transformation =
    transformationTypes[image?.transformationType as TransformationTypeKey];

  return (
    <>
      <Header
        title={transformation?.title}
        subtitle={transformation?.subTitle}
      />

      <section className="mt-10">
        {image && (
          <TransformationForm
            action="Update"
            type={image?.transformationType as TransformationTypeKey}
            config={image?.config}
            data={image}
          />
        )}
      </section>
    </>
  );
};
export default UpdateImage;
