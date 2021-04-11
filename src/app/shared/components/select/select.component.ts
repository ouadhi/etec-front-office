import { Injector } from '@angular/core';
import { Component, forwardRef, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { BaseComponent } from '../base.component';
/**
 * App Select Component
 */
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
  ]
})
export class SelectComponent extends BaseComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() bindValue; 
  @Input() bindLabel;
  @Input() data = [];
  @Input() hideLoaded = false;
  @Input() placeholder;
  @Input() maxWidth;
  @Input() multiple = false;
  @Input() isAsync = false;
  @Input() groupBy;
  @Input() hideSelectedItems = false;
  @Input() attachSource = false;
  @Input() closeOnSelect = false;
  @Input() source$: Observable<any>;
  @Output() select: Subject<Object> = new Subject();
  selection;
  buffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  propagateChange: any = () => { };
  validateFn: any = () => { };
  
  constructor(public injector: Injector) { super(injector); }

  compare = (item, selected) => {
    this.loggerService.log(item);
    this.loggerService.log(selected);
    if (selected.id && item.id) {
      return item.id === selected.id;
    }
    return false;
  }

  emitSelection(event) {
    this.loggerService.log(this.selection);
    this.propagateChange(this.selection);
    this.select.next(event);
  }
  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.data.length === this.buffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.buffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.buffer.length;
    const more = this.data.slice(len, this.bufferSize + len);
    this.buffer = this.data.concat(more);
  }
  writeValue(value) {
    if (value) {
      this.selection = value;
    }
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  ngOnChanges(changes): void {
    if (changes.data && changes.data.currentValue && changes.data.previousValue) {
      this.data = [...changes.data.currentValue];
      this.buffer = this.data.slice(0, this.bufferSize);


    }
  }
  ngOnInit() {
    this.buffer = this.data.slice(0, this.bufferSize);

  }

}
