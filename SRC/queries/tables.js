const createTablesQueries = {
  createDataBase: () => {
    return {
      name: 'create-database',
      text: 'CREATE DATA BASE finances'
    }
  },

  createUsers: () => {
    return {
      name: 'create-users',
      text: 'CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL)'
    }
  },
  createCategories: () => {
    return {
      name: 'create-categories',
      text: 'CREATE TABLE categories(id SERIAL PRIMARY KEY NOT NULL, name TEXT NOT NULL)'
    }
  },
  createFinances: () => {
    return {
      name: 'create-finances',
      text: 'CREATE TABLE finances(id SERIAL PRIMARY KEY NOT NULL, user_id INT, category_id INT, date DATE, title TEXT, value NUMERIC, CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, CONSTRAINT fk_categories FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL)'
    }
  },

  initialize: async () => {
    try {
    } catch (error) {
      throw new Error('error initializing database', error)
    }
  }
}

module.exports = createTablesQueries
