import Mustache from 'mustache';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import FileService from '../utils/fileService';

const getUseModelTpl = () =>
  readFileSync(resolve(__dirname, './useModel.tpl'), 'utf-8');

export default function generateUseModel(fileService: FileService) {
  fileService.writeFile({
    path: 'useModel.ts',
    content: Mustache.render(getUseModelTpl(), {}),
  });
}
