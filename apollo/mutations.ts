import { gql } from "@apollo/client";

export const LikeMutation = gql`
  mutation Like($id: String!) {
    like(id: $id)
  }
`;
