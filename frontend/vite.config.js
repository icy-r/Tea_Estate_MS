import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@divs": "/src/components/divs",
      "@assets": "/src/assets",
      "@routes": "/src/routes",
      "@services": "/src/services",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@constants": "/src/constants",
    },
  },
  optimizeDeps: {
    exclude: ["chunk-P5NKTEZO", "chunk-OQS7HNDH"],
  },
});
