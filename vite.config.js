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
        form: resolve(__dirname, 'src/form.ts'),
        'deal-list': resolve(__dirname, 'src/deal-list.ts'),
        // Все страницы из папки pages
        ...getPages()
      },
      output: {
        // Сохраняем структуру папок в dist
        experimentalMinChunkSize: 5000,
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'form')
            return 'assets/form.js';

          if (chunkInfo.name === 'deal-list')
            return 'assets/deal-list.js';

          return 'assets/entry[name].[hash].js';
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'main')
            return 'assets/script.js';

          return 'assets/entry[name].[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? '';

          if (name.includes('main.css'))
            return 'assets/template_styles.css';

          return 'assets/[name].[ext]';
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