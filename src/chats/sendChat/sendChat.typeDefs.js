import { gql } from "apollo-server";

export default gql`
  type sendChatResult {
    ok: Boolean!
    error: String
    message: Chat!
  }
  type Mutation {
    sendChat(receiverId: String!, text: String!): sendChatResult!
  }
`;