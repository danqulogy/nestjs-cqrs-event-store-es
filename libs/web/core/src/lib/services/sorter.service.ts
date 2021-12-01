import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SorterService {
  constructor() {}

  sort<T>(items: T[], sortMeta: { key: string; value: string }) {
    const sortName = sortMeta.key
    const sortValue = sortMeta.value
    let sortedItems = []

    if (sortName && sortValue) {
      sortedItems = items.sort((a, b) =>
        sortValue === 'ascend'
          ? a[sortName!] > b[sortName!]
            ? 1
            : -1
          : b[sortName!] > a[sortName!]
          ? 1
          : -1,
      )
    } else {
      sortedItems = items
    }

    return sortedItems
  }
}
