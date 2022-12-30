// create vitest config
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    //
  ],
  test: {
    testTimeout: 1000,
    reporters: ["verbose"],
    deps: {
      interopDefault: true,
    },
  },
  resolve: {
    alias: [
      {
        find: "@db",
        replacement: path.resolve(__dirname, "src", "server", "db"),
      },
      {
        find: "@server",
        replacement: path.resolve(__dirname, "src", "server"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src", "components"),
      },
    ],
  },
});
