import { gql } from "apollo-server";

export default gql`
  type deletePost {
    ok: Boolean
    message: String
  }
  type Mutation {
    deletePost(postNumber: Int!, writerNickname: String!): deletePost
  }
`;
