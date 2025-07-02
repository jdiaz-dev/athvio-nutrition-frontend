import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // depending on your application, base can also be "/"
    // base: '/',

    plugins: [react(), viteTsconfigPaths()],
    optimizeDeps: {
      include: ['@mui/material', '@mui/icons-material'],
    },
    define: {
      'process.env.REACT_APP_GRAPHQL_HTTP_URI': JSON.stringify(env.REACT_APP_GRAPHQL_HTTP_URI),
      'process.env.REACT_APP_GRAPHQL_WS_URI': JSON.stringify(env.REACT_APP_GRAPHQL_WS_URI),
    },
    resolve: {
      alias: [
        // { find: '', replacement: path.resolve(__dirname, 'src') },
        // {
        //   find: /^~(.+)/,
        //   replacement: path.join(process.cwd(), 'node_modules/$1')
        // },
        // {
        //   find: /^src(.+)/,
        //   replacement: path.join(process.cwd(), 'src/$1')
        // }
        // {
        //   find: 'assets',
        //   replacement: path.join(process.cwd(), 'src/assets')
        // },
      ],
    },
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 4200,
    },
    build: {
      target: 'esnext', // ✅ This enables top-level await
    },
  };
});
