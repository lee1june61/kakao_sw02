import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createPost(
      title: String!
      text: String!
      writerNickname: String!
      writer_id: String!
    ): Post
  }
`;
