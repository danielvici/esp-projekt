/**
 * @author Esad Mustafoski
 * @file test/api_main_test.ts
 * This file is made to test the API returns, Is not ready yet
 */

/// <reference lib="deno.ns" />

// +++ IMPORTS ------------------------------------------------------ //
import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { app } from "../api/main.ts";

// +++ TESTS ------------------------------------------------------- //
Deno.test("GET /api returns testAPIPoint", async () => {
  const request = await superoak(app);
  await request.get("/api").expect(200).expect("testAPIPoint");
});

