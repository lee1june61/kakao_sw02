import { gql } from "apollo-server";

export default gql`
  type TokenResponse {
    status: String!
    access_token: String!
  }

  type UserResponse {
    status: String!
    user: User!
  }

  type User {
    id: Int!
    nickname: String!
    role: RoleType!
    affiliation: Militarytype
    phonenumber: String
    militaraybase: String
  }

  enum RoleType {
    user
    counselor
    admin
  }

  enum Militarytype {
    army
    Navy
    airForce
    Headquarters
  }

  input SignupUser {
    id: Int!
    password: String!
    nickname: String!
    role: RoleType!
    affiliation: Militarytype!
    phonenumber: String!
    militaraybase: String!
  }

  type Query {
    # Auth
    TokenResponse: TokenResponse! # 토큰발급
    logoutUser: Boolean! # 로그아웃 토큰해제
    # User
    getMe: UserResponse!
  }

  type Mutation {
    Login(id: Int!, password: String!): TokenResponse!
    signupUser(input: SignupUser!): UserResponse!
  }
`;
