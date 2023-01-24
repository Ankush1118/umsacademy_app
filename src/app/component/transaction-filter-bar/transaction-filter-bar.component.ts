import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-filter-bar',
  templateUrl: './transaction-filter-bar.component.html',
  styleUrls: ['./transaction-filter-bar.component.scss'],
})
export class TransactionFilterBarComponent implements OnInit {
  @Input() value : any;
  @Input() purchaseDate: string ;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() subscriptionDateChange : EventEmitter<string> = new EventEmitter<string>();
  @Output() loadClients: EventEmitter<string> = new EventEmitter();



  constructor() { }

  ngOnInit() {}

}
