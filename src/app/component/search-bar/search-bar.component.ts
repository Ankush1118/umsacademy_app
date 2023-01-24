import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ClientPlanService } from 'src/app/services/clientsPlan.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

 @Input() value : any;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();

  plans: any[]=[];


  constructor(private clientPlanService: ClientPlanService) { }

  ngOnInit() {}

  inputChange(){
    this.valueChange.emit(this.value)
  }

  // planChange(){
  //   console.log(this.planId);
  //   this.planIdChange.emit(this.planId)
  //   this.loadPlan.emit();
  // }

  // async loadPlans(){
  //   this.plans = await this.clientPlanService.getAllClientPlans();
  //   this.planId = this.plans[0].planId;
  //   this.planChange();
  // }

}
