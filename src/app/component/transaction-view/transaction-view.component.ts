import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientPlan } from 'src/app/model/clientPlan';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss'],
})
export class TransactionViewComponent implements OnInit {
  @Input() clientPlan : ClientPlan;
  @Output() refresh: any = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
