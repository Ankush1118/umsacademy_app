import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-health-filter-bar',
  templateUrl: './health-filter-bar.component.html',
  styleUrls: ['./health-filter-bar.component.scss'],
})
export class HealthFilterBarComponent implements OnInit {

  @Input() value : any;
  @Input() healthDate: string ;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() healthDateChange : EventEmitter<string> = new EventEmitter<string>();
  @Output() loadClients: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit() { 
    this.healthDate = new Date().toISOString();
    this.healthDateChange.emit(this.healthDate);
    // this.healthDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530');
  }

  inputChange(){  
    this.valueChange.emit(this.value)
  }

  dateChangeFunction(){   
    console.log(this.healthDate);
    this.healthDateChange.emit(formatDate(this.healthDate, 'yyyy-MM-dd', 'en-US', '+0530'))
    this.loadClients.emit();
  }

}
