import pg from "pg";
import{PG_PORT,PG_HOST,PG_USER,PG_PASSWORD,PG_DATABASE} from "./config.js"

const { Pool } = require('pg');
export const pool = new pg.Pool({

    port: 5432,
    host: localhost,
    user: postgres,
    password: admin,
    database: PostgresSQL15,
});
module.exports = pool

pool.on("connect", () => {
    console.log("connectado a la base de datos");
});
