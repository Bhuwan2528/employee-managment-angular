import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleClass',
})
export class RoleClassPipe implements PipeTransform {
  transform(role: string|undefined| null): string {
    switch(role){

      case 'ADMIN' : return 'role-admin' ;
      
      case 'SUPER_ADMIN' : return 'role-super-admin' ;
      
      case 'HR' : return 'role-hr' ;
      
      case 'EMPLOYEE' : return 'role-employee' ;

      default: return 'role-default'
    }
  }
}
