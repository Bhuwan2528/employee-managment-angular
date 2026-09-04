import { EntityDataModuleConfig } from '@ngrx/data';
import { entityMetadata } from '../../store/entity/entity-metadata';

export const entityConfig: EntityDataModuleConfig = {

  entityMetadata,

  pluralNames: {
    Employee: 'Employees'
  }

};