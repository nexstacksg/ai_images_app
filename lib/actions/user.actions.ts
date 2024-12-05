import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import apolloClient from "../apolloClient";
import { GET_ME } from "@/graphql/queries/me";
import { setUserInfo } from "@/utils/auth";
import { UpdateUserBalance } from "@/graphql/mutation/user";
import { toast } from "@/components/ui/use-toast";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(email: string, token: string) {
  try {
    let response = await apolloClient.query({
      query: GET_ME,
      fetchPolicy: "network-only",
      variables: {
        email: email,
      },
    });
    const userData = response?.data?.usersPermissionsUsers[0];
    setUserInfo(token, JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.log(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(
  profileId: string,
  creditFee: number,
  email: string,
  token: string
) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UpdateUserBalance,
      variables: {
        documentId: profileId,
        data: {
          creditBalances: creditFee,
        },
      },
    });
    await getUserById(email, token);
    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted from your account",
      duration: 5000,
      className: "success-toast",
    });
  } catch (error) {
    console.log(error);
  }
}
