import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Health } from 'src/app/model/health';

@Component({
  selector: 'app-health-view',
  templateUrl: './health-view.component.html',
  styleUrls: ['./health-view.component.scss'],
})
export class HealthViewComponent implements OnInit {

  @Input() healthStatus : Health;
  @Output() refresh: any = new EventEmitter();


  constructor() { }

  ngOnInit() {}

}
