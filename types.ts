
export enum ViewState {
  Welcome,
  Form,
  Loading,
  Result,
}

export interface FormData {
  product: string;
  kpi: string;
  persona: string;
  competitors: string;
}
