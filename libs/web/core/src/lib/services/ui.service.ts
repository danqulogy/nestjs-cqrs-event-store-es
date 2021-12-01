import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  responsiveGutter = { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }
  constructor() {
  }

  /**
   * @Deprecated
   * @param errorObject
   */
  buildErrorString = errorObject => {
    const subheading = 'The following errors occurred: '
    const keys = Object.keys(errorObject)
    const values = Object.values(errorObject)
    const items = []

    keys.map((value, index) => {
      items.push(`${keys[index]} ${values[index]}`)
    })

    return { subheading, items }
  }
}
