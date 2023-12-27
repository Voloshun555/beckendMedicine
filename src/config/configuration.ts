export default () => ({
  database: {
    url: process.env.DB_URL,
    name: process.env.DATABASE_NAME,
  },
});
