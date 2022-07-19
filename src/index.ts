import { PluginOption } from 'vite';

import {
  generateProvider,
  generateDispatcher,
  generateInitor,
  generateUseModel,
  generateExport,
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

    config: () => ({
      resolve: {
        alias: {
          '@vite-plugin-react-use-model': './.hong',
        },
      },
    }),
    configResolved() {
      fileService = new FileService({
        cwd: process.cwd(),
        modelDir,
      });

      generateProvider(fileService);
      generateDispatcher(fileService);
      generateInitor(fileService);
      generateUseModel(fileService);
      generateExport(fileService);
    },
  };
}
