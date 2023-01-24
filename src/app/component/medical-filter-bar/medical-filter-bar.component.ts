import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-medical-filter-bar',
  templateUrl: './medical-filter-bar.component.html',
  styleUrls: ['./medical-filter-bar.component.scss'],
})
export class MedicalFilterBarComponent implements OnInit {

  @Input() value : any;
  @Input() medicalDate: string ;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() medicalDateChange : EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {}

  inputChange(){
    this.valueChange.emit(this.value)
  }

  dateChangeFunction(){
    console.log(this.medicalDate);
    this.medicalDateChange.emit(this.medicalDate)
    // this.loadStudents.emit();
  }

}
