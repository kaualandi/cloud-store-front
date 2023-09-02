export interface IPagedReq<T> {
  results: T[];
  count: number;
  next: string;
  previous: string;
}

export interface ISelectValue {
  value: string | number;
  label: string;
}
