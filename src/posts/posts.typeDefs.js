import { gql } from "apollo-server";

export default gql`
  type Post {
    title: String
    postId: Int
    text: String
    writerNickname: String
    writer_id: String
    recommend: Int
    share: Int
    comment: [Comment]
  }
`;
