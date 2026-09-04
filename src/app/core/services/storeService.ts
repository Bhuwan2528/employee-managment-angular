import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { EmployeePagination } from "../models/emloyee.model";
import { setEmployeePagination } from "../../store/actions/employee.action";
import { selectEmployeesPagination } from "../../store/selectors/employeeSelector";

@Injectable({
    providedIn: 'root'
})

export class StoreService {

    private store = inject(Store)

    addEmployeePagination(pagination: EmployeePagination){
        this.store.dispatch(
            setEmployeePagination({pagination})
        )
    }

    getEmployeePagination$(){
        return this.store.select(selectEmployeesPagination)
    }
}