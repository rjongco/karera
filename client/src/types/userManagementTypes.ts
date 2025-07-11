export type UserManagementTableColumn = {
  id: number | string;
  numeric: boolean | 0 | 1;
  disablePadding: boolean | 0 | 1;
  label?: string;
};

export type UserManagementContext = {
  url: any;
  sorted: any;
  searchRoles: any;
  searchStatus: any;
  filters: any;
  setData: () => any;
};
