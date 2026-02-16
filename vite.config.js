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
        // Настройки для JS файлов
        entryFileNames: (chunkInfo) => {
          // Если это наш главный JS файл
          if (chunkInfo.name === 'main') {
            return 'assets/script.js'
          }
          // Для остальных JS (если будут)
          return 'assets/script.js'
        },
        
        // Настройки для CSS файлов
        assetFileNames: (assetInfo) => {
          // Если это CSS файл
          if (assetInfo.names && assetInfo.names[0]) {
            if (assetInfo.names[0].endsWith('.css'))
              return 'assets/styles.css'

            if (assetInfo.names[0].includes('icon'))
              return 'icons/[name].[ext]'

            if (assetInfo.names[0] === 'manifest.json')
              return 'manifest.json'
          }
          // Для остальных ассетов (изображения, шрифты и т.д.)
          return 'assets/[name].[ext]'
        },
        
        // Настройки для общих chunk'ов
        chunkFileNames: (chunk) => {
          if (chunk.name === 'main') {
            return 'assets/script.js'
          }
          return 'assets/[name].[hash].js'
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