import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
    user: User
  }
  type Mutation {
    login(armynumber: String!, password: String!): LoginResult!
  }
`;
