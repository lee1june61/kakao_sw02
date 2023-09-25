import { gql } from "apollo-server";

export default gql`
  type getChatroomsResult {
    ok: Boolean!
    error: String
    rooms: [Room]
  }
  type Query {
    getChatrooms(lastId: Int!): getChatroomsResult!
  }
`;