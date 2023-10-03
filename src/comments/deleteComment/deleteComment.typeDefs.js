import { gql } from "apollo-server";

export default gql`
  type deleteCommentResult {
    ok: Boolean!
    message: String
  }

  type Mutation {
    deleteComment(_id: String!, nickname: String): deleteCommentResult
  }
`;
