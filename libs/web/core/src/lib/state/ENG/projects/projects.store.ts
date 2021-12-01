import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ProjectDto } from '@fom/shared/api-dtos';

export interface ProjectsState extends EntityState<ProjectDto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'projects', idKey: '_id',  })
export class ProjectsStore extends EntityStore<ProjectsState> {

  constructor() {
    super();
  }

}
