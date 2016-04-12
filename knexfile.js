module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/slack-overflow'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
