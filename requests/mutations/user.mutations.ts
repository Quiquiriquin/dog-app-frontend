import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      password
    }
  }
`;
