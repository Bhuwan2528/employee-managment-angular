import { EntityMetadataMap } from '@ngrx/data';
import { EmployeeServerResponse } from '../../core/models/emloyee.model';
import { AttendanceServerResponse } from '../../core/models/attendance.model';

export const entityMetadata: EntityMetadataMap = {

  Employee: {
    entityName: 'Employee',

    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false
    },

    selectId: (employee: EmployeeServerResponse) => employee.id
  },

  Attendance:{
    entityName: 'Attendance',

    entityDispatcherOptions:{
      optimisticUpdate: true,
      optimisticDelete: false
    },

    selectId: (attendance: AttendanceServerResponse) => attendance.data[0].id

  },


};