import { gql } from "apollo-server";

export default gql`
  type allPostsResult {
    ok: Boolean
    message: String
    posts: [Post]
  }
  type Query {
    allPosts: allPostsResult
  }
`;
