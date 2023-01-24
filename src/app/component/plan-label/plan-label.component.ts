import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PortfolioService} from "../../services/portfolio.service";
import {AlertController} from "@ionic/angular";
import { Plan } from 'src/app/model/Plan';

@Component({
  selector: 'app-plan-label',
  templateUrl: './plan-label.component.html',
  styleUrls: ['./plan-label.component.scss'],
})
export class PlanLabelComponent implements OnInit {

  @Input() plan: Plan;
  @Input() isChecked: any = false;
  @Input() isEditMode: boolean = false;
  @Output() edit: EventEmitter<any> = new EventEmitter();

  constructor(private portfolioService: PortfolioService,
              private alertController: AlertController
  ) {
  }

  ngOnInit() {
   
  }

  editClicked() {
    this.edit.emit();
  }

  imageError() {
    
  }
}
