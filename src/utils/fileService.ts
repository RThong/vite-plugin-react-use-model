import { existsSync, readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import { dirname, join, resolve } from 'path';
import { normalizePath } from 'vite';
import { DEFAULT_MODEL_DIR, TEMP_DIR_NAME } from './constants';

export interface FileServiceOptions {
  cwd: string;
  modelDir?: string;
}

class FileService {
  paths:
    | {
        cwd: string;
        absSrcPath: string;
        absTmpPath: string;
        modelDirPath: string;
      }
    | { [key: string]: never } = {};

  constructor(options: FileServiceOptions) {
    this.initPaths(options);
  }

  initPaths(options: FileServiceOptions) {
    const absSrcPath = normalizePath(resolve(options.cwd, './src'));
    const absTmpPath = normalizePath(
      resolve(options.cwd, `./src/${TEMP_DIR_NAME}`),
    );
    const modelDirPath = normalizePath(
      resolve(options.cwd, options.modelDir ?? DEFAULT_MODEL_DIR),
    );

    this.paths.cwd = options.cwd;
    this.paths.absSrcPath = absSrcPath;
    this.paths.absTmpPath = absTmpPath;
    this.paths.modelDirPath = modelDirPath;
  }

  writeFile({ path, content }: { path: string; content: string }) {
    const absPath = join(this.paths.absTmpPath, path);

    mkdirp.sync(dirname(absPath));
    if (!existsSync(absPath) || readFileSync(absPath, 'utf-8') !== content) {
      writeFileSync(absPath, content, 'utf-8');
    }
  }
}

export default FileService;
