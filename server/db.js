import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {Pool} = pkg;

const pool = new Pool({
user: process.env.pg_user,
database: process.env.pg_database,
password: process.env.pg_password,
port: process.env.pg_port,
host: process.env.pg_host,
});

export default pool;