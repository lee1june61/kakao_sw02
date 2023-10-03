import { gql } from "apollo-server";

export default gql`
  type createPostResult {
    ok: String
    message: String
  }

  type Mutation {
    createPost(
      title: String!
      text: String!
      writerNickname: String!
    ): createPostResult
  }
`;
