const { gql } = require('apollo-server-express');

// Define GraphQL types
const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: [String]
  }

  input EmployeeInput {
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: [String]
  }

  type Query {
    listEmployees(page: Int, limit: Int, sortBy: String, order: String): [Employee]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: EmployeeInput): Employee
    updateEmployee(id: ID!, input: EmployeeInput): Employee
  }
`;

module.exports = typeDefs;
