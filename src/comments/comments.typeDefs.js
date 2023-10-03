import { gql } from "apollo-server";

export default gql`
  scalar Date

  type Comment {
    _id: String
    text: String
    writerNickname: String
    writerId: String
    postId: String
    createdAt: Date
    updatedAt: Date
  }
`;
