import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { FoodItemsStore } from './food-items.store';
import { FoodItemsInListDto } from '@fom/shared/api-dtos';
import { API_BASE_URL } from '../../constants';
import { EMPTY } from 'rxjs';
import { FoodItemsQuery } from './food-items.query';

@Injectable({ providedIn: 'root' })
export class FoodItemsService {
  private apiBase: string;
  constructor(private foodItemsStore: FoodItemsStore,
              private query: FoodItemsQuery,
              @Inject(API_BASE_URL) private serverBaseUrl: string,
              private http: HttpClient) {
    this.apiBase = `${this.serverBaseUrl}/food-items`;
  }

  getAlFoodItemsRT(){
    const eventSource = new EventSource(`${this.apiBase}/sse`);
    eventSource.onmessage = ({ data }) => {
      this.foodItemsStore.reset()
      // console.log('New Item Available', JSON.parse(data))
      this.foodItemsStore.set(JSON.parse(data))
    }
  }

  getAllFoodItems() {
    const request = this.http.get<FoodItemsInListDto[]>(this.apiBase).pipe(
      tap((entities) => {
        this.foodItemsStore.set(entities);
      })
    );
    return this.query.selectHasCache().pipe(switchMap((hasCache) => (hasCache ? EMPTY : request)));
  }

  setActive(id: string) {
    this.foodItemsStore.setActive(id);
  }

  clearCache() {
    this.foodItemsStore.setHasCache(false, { restartTTL: true });
  }


  delete(_id: string) {
    return this.http.delete<void>(`${this.apiBase}/${_id}`);
  }


}
