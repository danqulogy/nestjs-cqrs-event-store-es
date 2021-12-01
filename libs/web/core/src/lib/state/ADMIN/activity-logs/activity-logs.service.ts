import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core'
import { ID } from '@datorama/akita';
import { switchMap, tap } from 'rxjs/operators'
import { Activity } from './activity-log.model';
import { ActivityLogsStore } from './activity-logs.store';
import { API_BASE_URL, SILENT_HEADERS } from '../../../constants';
import { EMPTY } from 'rxjs'
import { ActivityLogsQuery } from './activity-logs.query'

@Injectable({ providedIn: 'root' })
export class ActivityLogsService {

  constructor(private activitiesStore: ActivityLogsStore,
              private query: ActivityLogsQuery,
              private http: HttpClient,
              @Inject(API_BASE_URL) private serverBaseUrl: string) {
  }

  getWithQuery(limit: number = 10, skip: number=0) {
    const request = this.http.get<Activity[]>(`${this.serverBaseUrl}/activity-logs`, {headers: SILENT_HEADERS})
      .pipe(tap(entities => {
        this.activitiesStore.set(entities);
      }));

    return this.query.selectHasCache().pipe(
      switchMap(hasCache => hasCache? EMPTY: request)
    )
  }


  add(activity: Activity) {
    this.activitiesStore.add(activity);
  }

  update(id, activity: Partial<Activity>) {
    this.activitiesStore.update(id, activity);
  }

  remove(id: ID) {
    this.activitiesStore.remove(id);
  }

  clearCache(){
    this.activitiesStore.setHasCache(false, {restartTTL: true})
  }


}
