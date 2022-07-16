import Mustache from 'mustache';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import FileService from '../utils/fileService';

const getProviderTpl = () =>
  readFileSync(resolve(__dirname, './provider.tpl'), 'utf-8');

export default function generateProvider(fileService: FileService) {
  const modelDirPath = fileService.paths.modelDirPath;

  const modelList = readdirSync(modelDirPath).map(
    (item) => item.split('.ts')[0],
  );

  fileService.writeFile({
    path: 'Provider.tsx',
    content: Mustache.render(getProviderTpl(), {
      importModels: modelList.map(
        (item) => `import ${item} from '${modelDirPath}/${item}';`,
      ),
      models: modelList.map((item) => `${item}: ${item},`),
    }),
  });
}
