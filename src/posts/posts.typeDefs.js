import { gql } from "apollo-server";

export default gql`
  type Post {
    title: String
    postNumber: Int
    text: String
    writerNickname: String
    writer_id: String
    recommend: Int
    share: Int
    comment: [Comment]
  }
  type Comment {
    _id: Int!
  }
`;
