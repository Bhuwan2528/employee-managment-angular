import { EmployeePagination } from "../../core/models/emloyee.model";

export const initialEmployeePaginationState: EmployeePagination = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false
};