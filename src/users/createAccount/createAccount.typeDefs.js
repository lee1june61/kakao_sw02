import { gql } from "apollo-server";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
    token: String
    userId: Int
  }
  type Mutation {
    createAccount(
      id: Int!
      nickname: String!
      password: String!
      role: String!
      affiliation: String!
      phonenumber: String
      militaraybase: String
    ): createAccountResult!
  }
`;