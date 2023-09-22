import { gql } from "apollo-server";

export default gql`
  type getChatroomsResult {
    ok: Boolean!
    error: String
    Chats: [Message]
  }
  type Mutation {
    getChatrooms: getChatroomsResult!
  }
`;