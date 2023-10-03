import { gql } from "apollo-server";

export default gql`
  type deletePostResult {
    ok: Boolean
    message: String
  }
  type Mutation {
    deletePost(postId: Int!, writerNickname: String!): deletePostResult
  }
`;
