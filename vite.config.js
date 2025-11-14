import { defineConfig } from "vite";
import fs from "fs";
import { injectManifest } from "workbox-build";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./cert.key"),
      cert: fs.readFileSync("./cert.crt"),
    },
    host: true,
  },

  plugins: [
    {
      name: "workbox-inject-manifest",
      closeBundle: async () => {
        // Inject Workbox manifest after Vite finishes building
        await injectManifest({
          swSrc: "service-worker.js",      // your source file in project root
          swDest: "dist/service-worker.js", // final SW in dist
          globDirectory: "dist",
          globPatterns: ["**/*.{html,js,css,png,svg,ico,json}"],
        });
      },
    },
  ],
});
