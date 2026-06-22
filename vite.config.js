import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" -> Capacitor WebView dosyaları file:// üzerinden yükler; göreli yol şart.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: { outDir: "dist", emptyOutDir: true },
});
