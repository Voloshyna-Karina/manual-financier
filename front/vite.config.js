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

//export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3030, // порт фронтенда
//     host: 'localhost', // явно указываем хост
//     open: true, // автоматически открывает браузер
//     hmr: { // явная настройка HMR
//       protocol: 'ws', // используем WebSocket
//       host: 'localhost',
//       port: 3030,
//       overlay: true // показывать ошибки в браузере
//     },
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//     watch: { // настройка отслеживания изменений
//       usePolling: true,
//       interval: 100
//     }
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "src/setupTests",
//     mockReset: true,
//   }
// });
