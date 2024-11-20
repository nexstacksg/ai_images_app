"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { redirect } from "next/navigation";

import { v2 as cloudinary } from "cloudinary";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import apolloClient from "../apolloClient";
import {
  CREATE_IMAGE,
  DELETE_IMAGE,
  UPDATE_IMAGE,
} from "@/graphql/mutation/images";
import { toast } from "sonner";
import { GET_IMAGE_BY_ID } from "@/graphql/queries/images";

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName clerkId",
  });

// ADD IMAGE
export async function addImage(addImageRequest: AddImageParams) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_IMAGE,
      variables: {
        data: addImageRequest,
      },
    });
    toast("successfully saved");
    return data;
  } catch (error) {
    console.log(error);
  }
}

// UPDATE IMAGE
export async function updateImage(
  addImageRequest: AddImageParams,
  documentId: string
) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_IMAGE,
      variables: {
        documentId: documentId,
        data: addImageRequest,
      },
    });
    toast("successfully updated");
    return data;
  } catch (error) {
    console.log(error);
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_IMAGE,
      variables: {
        documentId: imageId,
      },
    });
    toast("successfully deleted");
    return data;
  } catch (error) {
    console.log(error);
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    let response = await apolloClient.query({
      query: GET_IMAGE_BY_ID,
      fetchPolicy: "network-only",
      variables: {
        documentId: imageId,
      },
    });
    const imageData = response?.data?.image;
    return imageData;
  } catch (error) {
    console.log(error);
  }
}

// GET IMAGES
export async function getAllImages({
  limit = 9,
  page = 1,
  searchQuery = "",
}: {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {
  try {
    await connectToDatabase();

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = "folder=imaginify";

    if (searchQuery) {
      expression += ` AND ${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource: any) => resource.public_id);

    let query = {};

    if (searchQuery) {
      query = {
        publicId: {
          $in: resourceIds,
        },
      };
    }

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find(query).countDocuments();
    const savedImages = await Image.find().countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    };
  } catch (error) {
    handleError(error);
  }
}

// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find({ author: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
