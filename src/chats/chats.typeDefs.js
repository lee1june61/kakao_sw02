import { gql } from "apollo-server";

export default gql`
  type Chat {
    _id: String!
    text: String!   
    sender: User!
    receiver: User!
    createdAt: String!
  }

  type Room {
    _id: String!
    counselor: User!
    client: User!
    create_at: String!
    update_at: String!
    chats: [Chat]
  }
`;