/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @description Core Utility for querying the Database and inserting Sample Data
 * @file core_utils.ts
 */

// +++ IMPORTS ------------------------------------------------------ //
import { DB, Row } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import * as db_create from "../../create_db.ts";

// +++ Helper ------------------------------------------------------ //
// "T" is a generic type, it can be anything and makes the function "flexible"(?)
async function queryDatabase<T>(
  db: DB,
  query: string,
  params: any[],
  mapRow: (row: Row) => T,
): Promise<T[]> {
  const results: T[] = [];
  try {
    const rows = await db.query(query, params);
    for (const row of rows) {
      results.push(mapRow(row));
    }
  } catch (error) {
    console.error("Database query error:", error);
  }
  return results;
}

// +++ FUNCTIONS --------------------------------------------------- //

/**
 * See:
 * @file ./create_db.ts
 */
function insertSamples(): void {
  db_create.insertSampleData();
}

function createDatabaseIfNotExist(): void {
  db_create.createDatabase();
}

export { queryDatabase, insertSamples, createDatabaseIfNotExist };