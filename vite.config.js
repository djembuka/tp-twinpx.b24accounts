import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

// Функция для поиска всех HTML файлов в папке pages
function getPages() {
  const pagesDir = resolve(__dirname, 'pages')
  const pages = {}
  
  // Проверяем существование папки pages
  if (!fs.existsSync(pagesDir)) {
    console.warn('Папка pages не найдена!')
    return pages
  }
  
  // Читаем содержимое папки pages
  const subDirs = fs.readdirSync(pagesDir)
  
  subDirs.forEach(dir => {
    const pagePath = resolve(pagesDir, dir, 'index.html')
    // Проверяем, существует ли index.html в подпапке
    if (fs.existsSync(pagePath)) {
      // Ключ: 'pages/auth/index' -> значение: путь к файлу
      pages[`pages/${dir}/index`] = pagePath
    }
  })
  
  return pages
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Главная страница (если есть)
        main: resolve(__dirname, 'index.html'),
        // Все страницы из папки pages
        ...getPages()
      },
      output: {
        // Сохраняем структуру папок в dist
        entryFileNames: 'assets/entry[name].[hash].js',
        chunkFileNames: 'assets/script.js',
        assetFileNames: (asset) => {
          if (asset.names.includes('main.css')) {
            return 'assets/template_styles.css'
          }
          return 'assets/[name].[ext]'
        }
      }
    },
    // Копируем все файлы из pages в dist с сохранением структуры
    outDir: 'dist',
  },
  
  // Настройки сервера для разработки
  server: {
    open: true
  }
})