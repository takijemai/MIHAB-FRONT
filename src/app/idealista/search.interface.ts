export interface SearchResult {
  elementList: any[];
  total: number;
  totalPages: number;
  actualPage: number;
  itemsPerPage: number;
  numPaginations: number;
  summary: string;
  alertName: string;
  lowerRangePosition: number;
  upperRangePosition: number;
  paginable: boolean;
}
