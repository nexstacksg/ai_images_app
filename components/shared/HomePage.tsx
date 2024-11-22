"use client";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Collection } from "./Collection";
import { useEffect, useState } from "react";
import { getAllImages } from "@/lib/actions/image.services";
import { ImageData } from "@/types/image.types";

const HomePage = (props: { page: number }) => {
  const [images, setImages] = useState<ImageData[]>();

  const fetchImage = async () => {
    const data = await getAllImages();
    setImages(data);
  };

  useEffect(() => {
    fetchImage();
  }, [props?.page]);

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        {images && (
          <Collection
            images={images ?? []}
            totalPages={images?.length / 2}
            page={props?.page}
          />
        )}
      </section>
    </>
  );
};
export default HomePage;
