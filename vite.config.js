import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        app: FileSystemIconLoader('./src/assets/svg-icons'),
      },
    }),
    createSvgIconsPlugin({
      // 图标文件夹中，所有的svg文件将被转换为svg精灵
      iconDirs: [path.resolve(process.cwd(), './src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),

    ElementPlus({
      useSource: true,
    }),
  ],
  server: {
    port: 80,
    proxy: {
      '/api/': {
        target: 'https://clasign.test.osinfra.cn/',
        changeOrigin: true,
      },
    },
  },
});
