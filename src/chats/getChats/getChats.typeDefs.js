import { gql } from "apollo-server";

export default gql`
  type getChatsResult {
    ok: Boolean!
    error: String
    Chats: [Message]
  }
  type Mutation {
    getChats: getChatsResult!
  }
`;