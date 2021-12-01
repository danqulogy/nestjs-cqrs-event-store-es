import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Brand } from './brand.model';
import { BrandsStore } from './brands.store';

@Injectable({ providedIn: 'root' })
export class BrandsService {

  constructor(private brandsStore: BrandsStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<Brand[]>('https://api.com').pipe(tap(entities => {
      this.brandsStore.set(entities);
    }));
  }

  add(brand: Brand) {
    this.brandsStore.add(brand);
  }

  update(id, brand: Partial<Brand>) {
    this.brandsStore.update(id, brand);
  }

  remove(id: ID) {
    this.brandsStore.remove(id);
  }

}
