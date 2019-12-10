// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealer.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations' // will be created automatically
    },
    seeds: {
      directory: './data/seeds'
    }
  }
  

};
