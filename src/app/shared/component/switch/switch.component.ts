import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'medical-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit , OnDestroy{
  
  @Input() default: boolean;
  @Output() changeValue = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {

  }

  onChangeValue() {
    this.changeValue.emit(this.default);
  }

  ngOnDestroy(): void {
  }
}
