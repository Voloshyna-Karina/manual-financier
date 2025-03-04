import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     open: true,
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "src/setupTests",
//     mockReset: true,
//   },
// })

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030, // порт фронтенда
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // порт сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
