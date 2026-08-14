import { inject, Injectable } from "@angular/core"
import { ToastService } from "../../core/services/toast.service"


@Injectable({
    providedIn: 'root'
})
export class PrintError{
    toast = inject(ToastService);

    toastError( error : string | null): void{
    if(error){
      this.toast    .error(JSON.parse(JSON.stringify(error)))
    }
}
}