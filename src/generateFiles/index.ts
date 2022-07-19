import FileService from '../utils/fileService';
import generateDispatcher from './dispatcher';
import generateExport from './export';
import generateInitor from './initor';
import generateProvider from './provider';
import generateUseModel from './useModel';

export const generateFiles = (fileService: FileService) => {
  generateProvider(fileService);
  generateDispatcher(fileService);
  generateInitor(fileService);
  generateUseModel(fileService);
  generateExport(fileService);
};
