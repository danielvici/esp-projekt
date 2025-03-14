/// <reference lib="deno.ns" />

/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Specifically for Users
 * @file userUtil.ts
 */

// +++ IMPORTS ------------------------------------------------------ //
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import { queryDatabase, mapAccountRow } from "./mod.ts";
import { Accounts } from "../interfaces.ts";

/**
 * @param user The username of the User to add
 * @param password The hashed password of the User to add
 * @param salt The salt used for the password
 * @returns "noUser" if user exists, "newUser" if registration successful
 */
function registerUser(
  db: DB,
  user: string,
  password: string,
  salt: string,
  userGroup: string,
  displayname: string,
  user_email: string,
  firstname: string,
  surname: string,
  account_created: string,
): string {
  const query_user_exists =
    `SELECT * FROM accounts WHERE user_username = '${user}'`;
  if (!query_user_exists) {
    return "noUser";
  }

  const query_add_user = `
        INSERT INTO accounts (
            username,
            password,
            password_salt,
            user_group,
            displayname,
            user_email,
            firstname,
            surname,
            account_created,
            bio,
            blocked_users,
            followers,
            following,
            contacts
        ) VALUES (
            '${user}',
            '${password}',
            '${salt}',
            '${userGroup}',
            '${displayname}',
            '${user_email}',
            '${firstname}',
            '${surname}',
            '${account_created}',
            '',
            '[]',
            '[]',
            '[]',
            '[]'
        )`;
  db.query(query_add_user);
  console.log(`New user: ${user}`);

  return "newUser";
}

/**
 * @returns Array of all Users in the Database
 */
async function getAllUsersFromDB(db: DB): Promise<Accounts[]> {
  const query = `SELECT * FROM accounts`;
  return await queryDatabase<Accounts>(db, query, [], mapAccountRow);
}

/**
 * @param username
 * @returns Returns the Accounts for the User with the given username
 */
async function getUserByUsername(db: DB, username: string): Promise<Accounts> {
  const query = `SELECT * FROM accounts WHERE username = '${username}'`;
  const params: string[] = [];
  const result = await queryDatabase<Accounts>(db, query, params, mapAccountRow);
  return result[0];
}

export { registerUser, getAllUsersFromDB, getUserByUsername };