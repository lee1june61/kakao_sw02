import { gql } from "apollo-server";

export default gql`
  type getChatroomsResult {
    ok: Boolean!
    error: String
    chats: [Chat]
  }
  type Query {
    getChatrooms: getChatroomsResult!
  }
`;