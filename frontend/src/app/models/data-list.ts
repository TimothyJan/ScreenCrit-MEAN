export interface DataList {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

export interface DataListWithDates extends DataList {
  dates: {
    maximum: string;
    minimum: string;
  };
}
