import { gql } from "apollo-server-core";

const schema = gql`
  type Query {
    _dummy: String
  }
`;

export default schema;
