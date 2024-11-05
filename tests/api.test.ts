// Responsible: Esad Mustafoski

// test/api_main_test.ts
/// <reference lib="deno.ns" />
// GENERATED USING AI, DO NOT USE YET
import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { app } from "../api/main.ts";

Deno.test("GET /api returns testAPIPoint", async () => {
  const request = await superoak(app);
  await request.get("/api").expect(200).expect("testAPIPoint");
});

