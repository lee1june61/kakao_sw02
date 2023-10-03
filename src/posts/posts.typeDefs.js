import { gql } from "apollo-server";

export default gql`
  type Post {
    title: String
    postId: Int
    text: String
    writerNickname: String
    writerId: String
    recommend: Int
    share: Int
    commentCnt: Int
    updatedAt: Date
    createdAt: Date
  }
  type Comment {
    _id: String!
  }
`;
