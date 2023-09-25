import { gql } from "apollo-server";

export default gql`
  type Chat {
    _id: Int!
    text: String!   
    sender: User!
    receiver: User!
    createdAt: String!
  }

  type Room {
    _id: Int!
    counselor: User!
    client: User!
    create_at: String!
    update_at: String!
    chats: [Chat]
  }
`;