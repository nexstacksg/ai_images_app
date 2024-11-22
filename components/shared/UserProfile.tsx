"use client";
import Image from "next/image";
import Header from "@/components/shared/Header";
import { getUserInfo, logout } from "@/utils/auth";
import { getImagesByProfile } from "@/lib/actions/image.services";
import { useEffect, useState } from "react";
import { ImageData } from "@/types/image.types";
import { Collection } from "./Collection";
import { Flex } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const UserProfile = (props: { page: number }) => {
  const router = useRouter();
  const user = JSON.parse(getUserInfo() ?? "{}") ?? {};
  const [images, setImages] = useState<ImageData[]>([]);

  const fetchImages = async () => {
    const data = await getImagesByProfile(user?.profile?.documentId);
    setImages(data);
  };
  useEffect(() => {
    if (user) {
      fetchImages();
    }
  }, []);

  return (
    <>
      <Flex justify="between">
        <Header title="Profile" />
        <Button
          variant="destructive"
          className="max-w-[100px] max-h-[50px]"
          onClick={() => {
            logout();
            router.replace("/sign-in");
          }}
        >
          Logout
        </Button>
      </Flex>
      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">
              {user.profile?.creditBalances ?? ""}
            </h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.length}</h2>
          </div>
        </div>
      </section>

      <section className="sm:mt-12">
        {images && (
          <Collection
            images={images ?? []}
            totalPages={images?.length / 9}
            page={props?.page}
          />
        )}
      </section>
    </>
  );
};

export default UserProfile;
