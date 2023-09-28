import { gql } from "apollo-server";

export default gql`
  type myCommentResult {
    ok: Boolean!
    message: String
    comment: [Comment]
  }

  type Query {
    myComment(writerNickname: String): myCommentResult
  }
`;
