import "dotenv/config";
import { initDatabase, getPool } from "./src/db.js";

async function run() {
  await initDatabase();
  const [rows] = await getPool().query("SELECT id, title, region FROM blogs");
  console.log("DB blogs:", rows);
  process.exit(0);
}

run();
