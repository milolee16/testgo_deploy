import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/ml': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // WebSocket 경로 프록시 추가
      '/socket.io': {
        target: 'http://localhost:9092',
        ws: true,            // WebSocket 프록시 활성화
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: "/testgo_deploy/",
})
