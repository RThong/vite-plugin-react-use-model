import Mustache from 'mustache';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import FileService from '../utils/fileService';

const getInitorTpl = () =>
  readFileSync(resolve(__dirname, './initor.tpl'), 'utf-8');

export default function generateInitor(fileService: FileService) {
  fileService.writeFile({
    path: 'Initor.tsx',
    content: Mustache.render(getInitorTpl(), {}),
  });
}
