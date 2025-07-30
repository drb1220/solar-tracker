import sqlite3 from "sqlite3";
import { execute } from "./sql.js";

const main = async () => {
  const db = new sqlite3.Database("my.db");
  try {
    await execute(
      db,
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL)`
    );
  } catch (error) {
    console.log(error);
  } finally {
    db.close();
  }
};

main();
