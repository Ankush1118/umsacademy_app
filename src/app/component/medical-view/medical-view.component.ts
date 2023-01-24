import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Medical } from 'src/app/model/medical';

@Component({
  selector: 'app-medical-view',
  templateUrl: './medical-view.component.html',
  styleUrls: ['./medical-view.component.scss'],
})
export class MedicalViewComponent implements OnInit {

  @Input() medical : Medical;
  @Output() refresh: any = new EventEmitter();


  constructor() { }

  ngOnInit() {}

}
