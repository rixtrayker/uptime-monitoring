const knex = require('../utils/db')

const UserRepository = {
  async getUser(id) {
    try {
      const user = await knex('users').where({ id }).first();
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await knex('users').where({ email }).first();
      return user;
    } catch (error) {
      throw error;
    }
  },

  async createUser({name, email, password}) {
    try {
      await knex('users').insert({ name, email, password });
      const user = await knex('users').where({ email }).first();
      return user;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id, {name, email, password}) {
    const updatedFields = {
      name,
      email,
      password,
    };
  
    // exclude empty undefiend and fields
    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([key, value]) => value !== undefined && value !== '')
    );
  
    let user = {};
  
    Object.keys(filteredFields).map((key) => {
      user[key] = filteredFields[key];
    });

    try {
      await knex('users').where({id}).update(user);
      const user = await knex('users').where({ email }).first();
      return user;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserRepository;
