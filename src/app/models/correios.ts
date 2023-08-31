export interface PriceDeadlineCorreios {
  sedex: {
    price: number;
    deadline: string;
    error: number;
  };
  pac: {
    price: number;
    deadline: string;
    error: number;
  };
}
