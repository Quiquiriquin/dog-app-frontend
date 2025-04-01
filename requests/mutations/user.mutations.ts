import { gql, useApolloClient } from "@apollo/client";

export const signupUser = async () => {
  try {
    return await client.mutate({
      mutation: SIGNUP_USER,
      variables: {
        input: {
          email: String,
          password: String,
        },
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const SIGNUP_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      password
    }
  }
`;
