export type LoginRequestBody = {
  email: string;
  password: string;
};
export type ListRequestParams = {
  search?: string;
  page?: number;
  limit?: number;
  categoryId?: number;
  status?: string;
  from?: string;
  to?: string;
  storeId?: number;
  orderTypeId?: number;
  paymentMethod?: string;
};

export type FilterTypeData = {
  name: string;
  label: string;
};

export type FilterTypeOptionData = {
  id: number;
  label: string;
  name: string;
};

export type TableColumn = {
  id: number | string;
  numeric: boolean | 0 | 1;
  disablePadding: boolean | 0 | 1;
  label?: string;
  role?: any[];
  filterType?: string;
  filterTypeData?: FilterTypeData[];
  sort?: boolean | 0 | 1;
  filter?: boolean | 0 | 1;
};

export type Context = {
  url: any;
  sorted: any;
  searchRoles: any;
  searchStatus: any;
  filters: any;
  setData: any | null;
  setSorted: any | null;
};
