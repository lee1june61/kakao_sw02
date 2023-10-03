import { gql } from "apollo-server";

export default gql`
  type createCommentResult {
    ok: Boolean!
    message: String
  }

  type Mutation {
    createComment(postId: Int!, text: String!): createCommentResult
  }
`;
