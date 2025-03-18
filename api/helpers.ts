/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @file api/helpers.ts
 * @description Helper functions for the API
 */

// +++ IMPORTS ------------------------------------------------------ //
import { Context } from "https://deno.land/x/oak/mod.ts";
import { encodeHex } from "jsr:@std/encoding/hex";
// import { hash } from "node:crypto";

export type ApiResponse = {
  status: number;
  body: unknown;
};


// +++ FUNCTIONS ---------------------------------------------------- //
/**
 * @description Sends a response to the client
 * @usage sendResponse(ctx, { status: 200, body: { message: "Success" } })
 * Status is the HTTP Status code
 * Body is the response body/message/data.
 */
const sendResponse = (ctx: Context, { status, body }: ApiResponse): void => {
  ctx.response.status = status;
  ctx.response.body = body as any;
};

/**
 * @usage errorResponse(ctx, 401, "Unauthorized")
 * @see sendResponse
 */
const errorResponse = (ctx: Context, status: number, message: string): void => {
  sendResponse(ctx, { status, body: { error: message } });
};

/**
 * @description password "Salter", used to salt the passwords before the hash, this salt will be
 * returned seperately to save the salt in the DB
 * @param password The password to salt
 * @returns {saltedPassword: string, salt: string} Password with the salt + Salt seperately, both strings
 */
const saltPassword = async (
  password: string,
): Promise<{ saltedPassword: string; salt: string }> => {
  const saltBytes = new Uint8Array(16); // 16 bytes = 128 bits for randomness
  await crypto.getRandomValues(saltBytes);
  const salt = encodeHex(saltBytes);

  const saltedPassword = `${password}${salt}`;

  return {
    saltedPassword,
    salt,
  };
};

/**
 * @description Hashing Function for Passwords/etc
 * @param password The password to hash
 * @returns {hash: string} The hashed password as a string
 */
const hashPassword = async (password: string): Promise<string> => {
  const to_hash = password;
  const buffer = new TextEncoder().encode(to_hash);
  const hash_buffer = await crypto.subtle.digest("SHA-256", buffer);
  const hash = await encodeHex(hash_buffer);
  return hash;
};

export { errorResponse, hashPassword, saltPassword, sendResponse };
