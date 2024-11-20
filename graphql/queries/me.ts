import { gql } from "@apollo/client";

export const GET_ME = gql`
  query UsersPermissionsUsers($email: String) {
    usersPermissionsUsers(filters: { email: { eq: $email } }) {
      documentId
      email
      username
      profile {
        documentId
        firstname
        lastname
        creditBalances
      }
    }
  }
`;
