import { DepartmentServerResponseDto } from "../../core/models/department.model";

export interface DepartmentState {
  departments: DepartmentServerResponseDto[];
  loading: boolean;
  error: string | null;
}

export const initialDepartmentState: DepartmentState = {
  departments: [],
  loading: false,
  error: null
};