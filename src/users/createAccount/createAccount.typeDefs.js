import { gql } from "apollo-server";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
    token: String
    userId: String
  }
  type Mutation {
    createAccount(
      armynumber: String!
      nickname: String!
      password: String!
      role: String!
      militarybase: String!
    ): createAccountResult!
  }
`;
