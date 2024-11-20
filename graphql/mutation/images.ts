import { gql } from "@apollo/client";

export const CREATE_IMAGE = gql`
  mutation CreateImage($data: ImageInput!) {
    createImage(data: $data) {
      documentId
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($documentId: ID!, $data: ImageInput!) {
    updateImage(documentId: $documentId, data: $data) {
      documentId
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($documentId: ID!) {
    deleteImage(documentId: $documentId) {
      documentId
    }
  }
`;
