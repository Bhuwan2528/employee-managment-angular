import { EntityMetadataMap } from '@ngrx/data';
import { EmployeeServerResponse } from '../../core/models/emloyee.model';

export const entityMetadata: EntityMetadataMap = {

  Employee: {
    entityName: 'Employee',

    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false
    },

    selectId: (employee: EmployeeServerResponse) => employee.id
  }

};