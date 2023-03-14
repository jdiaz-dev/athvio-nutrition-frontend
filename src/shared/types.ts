export type DataUser = {
  token: string;
  userId: string;
};

export type DataConfirm = {
  openDialog: boolean;
  resultConfirm: boolean;
  action: string;
  message?: string;
};
