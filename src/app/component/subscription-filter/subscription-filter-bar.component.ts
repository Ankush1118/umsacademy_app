import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-subscription-filter-bar',
  templateUrl: './subscription-filter-bar.component.html',
  styleUrls: ['./subscription-filter-bar.component.scss'],
})
export class SubscriptionFilterBarComponent implements OnInit {

  @Input() value : any;
  @Input() purchaseDate: string ;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() purchaseDateChange : EventEmitter<string> = new EventEmitter<string>();
  @Output() refresh: EventEmitter<string> = new EventEmitter();


  constructor() { }

  async ngOnInit() {

  }

  inputChange(){  
    this.valueChange.emit(this.value)
  }

  async dateChangeFunction(){   
    console.log(this.purchaseDate);
    await this.purchaseDateChange.emit(formatDate(this.purchaseDate, 'yyyy-MM-dd', 'en-US', '+0530'));
    await this.refresh.emit();
  }

}
