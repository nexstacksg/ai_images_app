"use client";
import Image from "next/image";
import Header from "@/components/shared/Header";
import { getToken, getUserInfo } from "@/utils/auth";
import { useEffect } from "react";
import { getUserById } from "@/lib/actions/user.actions";

const UserProfile = () => {
  const token = getToken();
  const user = JSON.parse(getUserInfo() ?? "{}") ?? {};

  //   const fetchUserInfo = async () => {
  //     await getUserById(user?.email, token);
  //   };
  //   useEffect(() => {
  //     if (user) {
  //       fetchUserInfo();
  //     }
  //   }, []);

  return (
    <>
      <Header title="Profile" />
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
              {user.profile.creditBalances}
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
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        {/* <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        /> */}
      </section>
    </>
  );
};

export default UserProfile;
