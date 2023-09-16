import { gql } from "apollo-server";

export default gql`
  type User {
    _id:         Int!
    identity     String!
    password     String!
    nickname     String!
    affiliation  Militarytype!
    phonenumber  String!
    militaraybase String!
  }

  enum Militarytype {
    "육군",
    "해군",
    "공군",
    "육본"
  }
`;