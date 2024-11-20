import { gql } from "@apollo/client";

export const GET_IMAGE_BY_ID = gql`
  query Image($documentId: ID!) {
    image(documentId: $documentId) {
      aspectRatio
      color
      config
      createdAt
      documentId
      height
      profile {
        firstname
        lastname
        documentId
        creditBalances
      }
      prompt
      publicId
      publishedAt
      secureURL
      title
      transformationType
      transformationUrl
      updatedAt
      width
    }
  }
`;
