import { existsSync, readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import { dirname, join, resolve } from 'path';

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
    const absSrcPath = resolve(options.cwd, './src');
    const absTmpPath = resolve(options.cwd, './src/.hong');
    const modelDirPath = resolve(
      options.cwd,
      options.modelDir ?? './src/models',
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
