import { gql } from "apollo-server";

export default gql`
  type sendChatResult {
    ok: Boolean!
    error: String
    message: String
  }
  type Mutation {
    sendChat(receiverId: String!, text: String!): sendChatResult!
  }
`;