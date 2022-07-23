import path from 'path';
import { PluginOption } from 'vite';

import { generateFiles } from './generateFiles';
import { TEMP_DIR_NAME } from './utils/constants';

import FileService from './utils/fileService';

export interface Options {
  /**
   * default: 'src/models'
   */
  modelDir?: string;
}

export default function viteReactUseModel(options?: Options): PluginOption {
  const { modelDir } = options ?? {};
  let fileService: FileService;

  return {
    // 插件名称
    name: 'vite-plugin-react-use-model',

    config: () => ({
      resolve: {
        alias: {
          '@vite-plugin-react-use-model': path.join(
            process.cwd(),
            `src/${TEMP_DIR_NAME}`,
          ),
        },
      },
    }),
    configResolved() {
      fileService = new FileService({
        cwd: process.cwd(),
        modelDir,
      });
      generateFiles(fileService);
    },
  };
}
