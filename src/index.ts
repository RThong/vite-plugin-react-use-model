import type { PluginOption } from 'vite';
import { normalizePath } from 'vite';

export default function vitePluginTemplate(): PluginOption {
  return {
    // 插件名称
    name: 'vite-plugin-react-use-model',

    // pre 会较于 post 先执行
    enforce: 'pre', // post

    // 4. vite 独有的钩子：主要用来配置开发服务器，为 dev-server (connect 应用程序) 添加自定义的中间件
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = normalizePath(req.url!);
        console.log('【configureServer】', url);

        next();
      });
    },
  };
}
