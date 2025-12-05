import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  srcDir: "./src/client",
  output: "server", 
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api": "http://localhost:8787",
      },
    },
  },

  adapter: cloudflare({
    imageService: "cloudflare",
  }),

  integrations: [react()],
});