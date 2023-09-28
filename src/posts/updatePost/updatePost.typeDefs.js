import { gql } from "apollo-server";

export default gql`
  type updatePostResult {
    ok: Boolean!
    message: String
    post: Post
  }

  type Mutation {
    updatePost(
      postId: Int!
      writerNickname: String!
      title: String
      text: String
    ): updatePostResult
  }
`;
