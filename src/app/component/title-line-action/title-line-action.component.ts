import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-line-action',
  templateUrl: './title-line-action.component.html',
  styleUrls: ['./title-line-action.component.scss'],
})
export class TitleLineActionComponent implements OnInit {

  @Input() title: string = 'Title';
  @Input() isEditButton: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
