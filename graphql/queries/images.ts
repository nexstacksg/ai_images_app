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
export const GET_IMAGE_BY_PROFILE = gql`
  query Images($profileId: ID!) {
    images(filters: { profile: { documentId: { eq: $profileId } } }) {
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

export const GET_IMAGES = gql`
  query Images {
    images {
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
