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

export const RegisterMutation = gql`
  mutation Login($credentials: RegisterMutationInput!) {
    register(credentials: $credentials)
  }
`;

export const RecipeMutation = gql`
  mutation Recipe($type: RecipeMutationType!, $payload: RecipeMutationInput!) {
    recipe(type: $type, payload: $payload) {
      ... on DeleteResult {
        deleted
      }

      ... on CreateResult {
        created
      }

      ... on EditResult {
        edited
      }
    }
  }
`;
