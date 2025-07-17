import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ⛔ Pliki/foldery ignorowane przez ESLint
  {
    ignores: [
      "app/generated/prisma/**",
      "node_modules/**",
      ".next/**",
      "**/.prisma/**",
    ],
  },
  // ✅ Reszta konfiguracji Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
