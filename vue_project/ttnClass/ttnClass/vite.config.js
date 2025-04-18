import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 配置@对应根目录别名
import { resolve } from 'path'

const pathResolve = (dir)  => resolve(__dirname, '.', dir)
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('./src')
    }
  }
})
