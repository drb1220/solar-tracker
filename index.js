import sqlite3 from "sqlite3";

const db = new sqlite3.Database("test.db", sqlite3.OPEN_READWRITE);