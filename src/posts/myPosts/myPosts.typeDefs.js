import { gql } from "apollo-server";

export default gql`
  type myPostsResult {
    ok: Boolean!
    message: String
    posts: [Post]
  }

  type Query {
    myPosts(writerNickname: String!): myPostsResult
  }
`;
