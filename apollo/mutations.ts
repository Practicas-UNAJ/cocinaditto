import { gql } from "@apollo/client";

export const LikeMutation = gql`
  mutation Like($id: String!) {
    like(id: $id)
  }
`;

export const LoginMutation = gql`
  mutation Login($credentials: LoginMutationInput!) {
    login(credentials: $credentials)
  }
`;
