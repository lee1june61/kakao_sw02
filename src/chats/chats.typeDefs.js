import { gql } from "apollo-server";

export default gql`
  type Chat {
    _id: Int!
    text: String!   
    senderId: Int!
    receverId: Int!
    createdAt: String!
  }
`;