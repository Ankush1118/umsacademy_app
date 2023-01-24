import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/model/meal';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.scss'],
})
export class MealViewComponent implements OnInit {

  @Input() meal : Meal;
  @Output() refresh: any = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  

}
