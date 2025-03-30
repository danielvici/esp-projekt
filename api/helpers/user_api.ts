/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @description API file for Users
 */

// +++ IMPORTS ------------------------------------------------------ //
import * as db_utils from "../../database/utils.ts";
// import * as helper_utils from "../helpers.ts";
import { Context } from "https://deno.land/x/oak@v17.1.2/mod.ts";

// +++ FUNCTIONS ----------------------------------------------------- //

/*async function api_user_getInfo(ctx: any): Promise<void> {
  const id = ctx.params.id;

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { error: "User ID required" };
    return;
  }

  try {
    const user = await db_utils.getAllUserInfoByID(id);
    if (user === null || user === undefined) {
      helper_utils.errorResponse(ctx, 404, "User not found");
      return;
    }

    ctx.response.body = user;
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, error as string);
  }
}
*/

async function api_getAllUsers(ctx: Context): Promise<void> {
  const getUsers = await db_utils.getAllUsersFromDB();
  ctx.response.body = getUsers;
}

export { 
    api_getAllUsers, 
    // api_user_getInfo 
};
