/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Pool } from "pg";
import { config } from "dotenv";
import { Player } from "../data/Player";
config();
const Config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
};
export const sql = {
  create() {
    pool.query("CREATE TABLE data (id text PRIMARY KEY, data json);");
  },
  retrive(id: number | string, callback) {
    pool.query("SELECT data FROM data WHERE ID =$1;", [id]).then((res) => {
      callback(res.rows[0].data);
    });
  },
  update(id: number | string, data: Player) {
    pool.query("UPDATE data SET data = $2 WHERE id = $1 ;", [id, data]);
  },
};
const pool = new Pool(Config);
export { pool };
