import { gql } from "apollo-server";

export default gql`
  type Subscription {
    newChat(roomId: String!): Chat
  }
`;
