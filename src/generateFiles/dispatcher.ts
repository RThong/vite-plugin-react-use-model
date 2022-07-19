import Mustache from 'mustache';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import FileService from '../utils/fileService';

const getDispatcherTpl = () =>
  readFileSync(resolve(__dirname, './dispatcher.tpl'), 'utf-8');

export default function generateDispatcher(fileService: FileService) {
  fileService.writeFile({
    path: '/helpers/dispatcher.ts',
    content: Mustache.render(getDispatcherTpl(), {}),
  });
}
