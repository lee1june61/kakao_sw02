import { gql } from "apollo-server";

export default gql`
  type getPostResult {
    ok: Boolean!
    message: String
    post: Post
    comment: [Comment]
  }

  type Query {
    getPost(postId: Int!): getPostResult
  }
`;
