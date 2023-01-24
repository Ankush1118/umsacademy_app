import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-meal-filter-bar',
  templateUrl: './meal-filter-bar.component.html',
  styleUrls: ['./meal-filter-bar.component.scss'],
})
export class MealFilterBarComponent implements OnInit {

  @Input() value : any;
  @Input() mealDate: any ;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() mealDateChange : EventEmitter<string> = new EventEmitter<string>();
  @Output() loadMeals: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit() {
    this.mealDate = new Date().toISOString();
    this.mealDateChange.emit(this.mealDate);
  }

  inputChange(){
    this.valueChange.emit(this.value)
  }

  dateChangeFunction(){
    console.log(this.mealDate);
    this.mealDateChange.emit(formatDate(this.mealDate, 'yyyy-MM-dd', 'en-US', '+0530'));
    this.loadMeals.emit();
  }


}
