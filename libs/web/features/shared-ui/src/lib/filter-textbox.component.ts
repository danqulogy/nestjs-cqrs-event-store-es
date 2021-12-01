import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-filter-textbox',
  template: `
    <nz-input-group class="w-64" nzSize="default" [nzSuffix]="suffixIconSearch">
      <input
        type="text"
        (input)="filter = $event.target['value']"
        [value]="filter"
        nz-input nzSize="default"
        [placeholder]="placeholderText"
      />
    </nz-input-group>
    <ng-template #suffixIconSearch>
      <i nz-icon nzType="search"></i>
    </ng-template>
  `,
})
export class FilterTextboxComponent implements OnInit {
  @Input() placeholderText: string
  @Output() changed: EventEmitter<string> = new EventEmitter<string>()

  constructor() {}

  private _filter = ''

  @Input() get filter() {
    return this._filter
  }

  set filter(val: string) {
    this._filter = val
    this.changed.emit(this.filter) // Raise changed event
  }

  ngOnInit() {}
}
