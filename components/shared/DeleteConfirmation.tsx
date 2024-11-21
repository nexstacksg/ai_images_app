"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { useMutation } from "@apollo/client";
import { DELETE_IMAGE } from "@/graphql/mutation/images";
import apolloClient from "@/lib/apolloClient";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteImageAction] = useMutation(DELETE_IMAGE, {
    client: apolloClient,
    onCompleted: (response) => {
      toast({
        title: "successfully deleted",
        duration: 5000,
        className: "success-toast",
      });
      router.back();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const deleteImage = async () => {
    await deleteImageAction({
      variables: { documentId: imageId },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full rounded-full">
        <Button
          type="button"
          className="button h-[44px] w-full md:h-[54px]"
          variant="destructive"
        >
          Delete Image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular">
            This will permanently delete this image
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="button h-[54px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="border bg-red-500 text-white hover:bg-red-600 max-w-[100px]"
            onClick={deleteImage}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
