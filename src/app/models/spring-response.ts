export interface BaseResponse<T> {
  data: T;
  date: Date;
  errors: any[];
  success: number;
  result: any;
}
