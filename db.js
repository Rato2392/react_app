const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "naosei",
  host: "localhost",
  port: 5432,
  database: "microbiome",
});

module.exports = pool;
