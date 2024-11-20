import { gql } from "@apollo/client";

export const UpdateUserBalance = gql`
  mutation UpdateProfile($documentId: ID!, $data: ProfileInput!) {
    updateProfile(documentId: $documentId, data: $data) {
      documentId
    }
  }
`;
