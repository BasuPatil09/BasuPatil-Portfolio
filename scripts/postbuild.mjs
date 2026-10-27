import { cpSync, existsSync } from "node:fs";

if (process.env.STATIC_EXPORT === "1" || !existsSync(".next/standalone")) {
  console.log("[postbuild] static export or no standalone output — skipping asset copy");
  process.exit(0);
}

cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
cpSync("public", ".next/standalone/public", { recursive: true });
console.log("[postbuild] standalone assets copied");
