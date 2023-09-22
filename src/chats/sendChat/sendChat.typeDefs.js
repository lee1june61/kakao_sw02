import { gql } from "apollo-server";

export default gql`
  type sendMessageResult {
    ok: Boolean!
    error: String
    message: String
  }
  type Mutation {
    sendMessage(chatroomId: Int!, text: String!): sendMessageResult!
  }
`;