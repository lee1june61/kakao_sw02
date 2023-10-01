import { gql } from "apollo-server";

export default gql`
  type TokenResponse {
    status: String!
    access_token: String!
  }

  type UserResponse {
    status: String!
    user: User!
  }

  type User {
    armynumber: String!
    nickname: String!
    password: String!
    role: String!
    militaraybase: String!
  }
`;
