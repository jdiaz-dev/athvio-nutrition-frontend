import { LocalStorageEnum } from '../Consts';
import { DataUser } from '../types';

export const getUserFromLocalStorage = (): DataUser =>
  JSON.parse(localStorage.getItem(LocalStorageEnum.dataUser) || '{}') as DataUser;

export const saveDataUser = (dataUser: DataUser): void => {
  localStorage.setItem(LocalStorageEnum.dataUser, JSON.stringify(dataUser));
  localStorage.setItem(LocalStorageEnum.authenticated, JSON.stringify(true));
};

export const checkAuthentication = (): boolean =>
  JSON.parse(localStorage.getItem(LocalStorageEnum.authenticated) || 'false') as boolean;

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(LocalStorageEnum.dataUser);
  localStorage.removeItem(LocalStorageEnum.authenticated);
};

// export const getToken = (): string => getUserFromLocalStorage().token ?? '';
