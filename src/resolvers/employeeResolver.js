// src/resolvers/employeeResolver.js
const Employee = require('../models/employee');

const employeeResolvers = {
  Query: {
    listEmployees: async (_, { page = 1, limit = 10, sortBy = 'name', order = 'ASC' }) => {
      const offset = (page - 1) * limit;
      return await Employee.findAll({
        limit,
        offset,
        order: [[sortBy, order]],
      });
    },

    getEmployee: async (_, { id }) => {
      return await Employee.findByPk(id);
    },
  },

  Mutation: {
    addEmployee: async (_, { input }) => {
      return await Employee.create(input);
    },

    updateEmployee: async (_, { id, input }) => {
      const employee = await Employee.findByPk(id);
      if (!employee) throw new Error('Employee not found');
      return await employee.update(input);
    },
  },
};

module.exports = employeeResolvers;
