import { gql } from "apollo-server";

export default gql`
  type updateCommentResult {
    ok: Boolean!
    message: String
    updatedAt: Date # Date나 그런거로 바꿔야함.
  }

  type Mutation {
    updateComment(
      _id: String!
      text: String
      nickname: String
    ): updateCommentResult
  }
`;
