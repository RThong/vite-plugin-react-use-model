import type { PluginOption } from 'vite';

import {
  generateProvider,
  generateDispatcher,
  generateInitor,
  generateUseModel,
} from './generateFiles';

import FileService from './utils/fileService';

export default function vitePluginTemplate({
  modelDir,
}: {
  modelDir?: string;
}): PluginOption {
  let fileService: FileService;

  return {
    // 插件名称
    name: 'vite-plugin-react-use-model',

    // pre 会较于 post 先执行
    enforce: 'pre', // post

    configResolved(config) {
      fileService = new FileService({
        cwd: process.cwd(),
        modelDir,
      });

      generateProvider(fileService);
      generateDispatcher(fileService);
      generateInitor(fileService);
      generateUseModel(fileService);
    },
  };
}
