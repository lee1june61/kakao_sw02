import { gql } from "apollo-server";

export default gql`
  type Message {
    _id: Int!
    text: String!   
    senderId: Int!
    receverId: Int!
    createdAt: String!
  }
`;