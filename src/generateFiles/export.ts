import Mustache from 'mustache';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import FileService from '../utils/fileService';

const getExportTpl = () =>
  readFileSync(resolve(__dirname, './export.tpl'), 'utf-8');

export default function generateExport(fileService: FileService) {
  fileService.writeFile({
    path: 'index.ts',
    content: Mustache.render(getExportTpl(), {}),
  });
}
