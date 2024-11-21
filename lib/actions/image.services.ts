import {
  CREATE_IMAGE,
  DELETE_IMAGE,
  UPDATE_IMAGE,
} from "@/graphql/mutation/images";
import apolloClient from "../apolloClient";
import { toast } from "@/components/ui/use-toast";
import {
  GET_IMAGE_BY_ID,
  GET_IMAGE_BY_PROFILE,
  GET_IMAGES,
} from "@/graphql/queries/images";

export async function addImage(addImageRequest: AddImageParams) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_IMAGE,
      variables: {
        data: addImageRequest,
      },
    });
    toast({
      title: "successfully saved",
      duration: 5000,
      className: "success-toast",
    });
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
    toast({
      title: "successfully updated",
      duration: 5000,
      className: "success-toast",
    });
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
    toast({
      title: "successfully deleted",
      duration: 5000,
      className: "success-toast",
    });
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
    console.log("image", imageData);

    return imageData;
  } catch (error) {
    console.log(error);
  }
}

export async function getImagesByProfile(profileId: string) {
  try {
    let response = await apolloClient.query({
      query: GET_IMAGE_BY_PROFILE,
      fetchPolicy: "network-only",
      variables: {
        profileId: profileId,
      },
    });
    const imageData = response?.data?.images;
    console.log("image", imageData);

    return imageData;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllImages() {
  try {
    let response = await apolloClient.query({
      query: GET_IMAGES,
      fetchPolicy: "network-only",
    });
    const imageData = response?.data?.images;
    return imageData;
  } catch (error) {
    console.log(error);
  }
}
