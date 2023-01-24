import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-client-search-bar',
  templateUrl: './client-search-bar.component.html',
  styleUrls: ['./client-search-bar.component.scss'],
})
export class ClientSearchBarComponent implements OnInit {

  @Input() value : any;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  inputChange(){
    this.valueChange.emit(this.value)
  }

}
