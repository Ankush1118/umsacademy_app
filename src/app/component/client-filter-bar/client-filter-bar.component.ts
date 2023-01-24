import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-filter-bar',
  templateUrl: './client-filter-bar.component.html',
  styleUrls: ['./client-filter-bar.component.scss'],
})
export class ClientFilterBarComponent implements OnInit {

  @Input() value : any;
  @Input() clientId : any;
  @Output() valueChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() clientIdChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() loadClients: EventEmitter<string> = new EventEmitter();

  clients: any[]=[];

  constructor(private clientService:ClientService) { }
  
  ngOnInit() {
    this.loadClientss();
  }

  inputChange(){
    this.valueChange.emit(this.value)
  }

  clientChange(){
    console.log(this.clientId);
    this.clientIdChange.emit(this.clientId)
    this.loadClients.emit();
  }

  async loadClientss(){
    this.clients = await this.clientService.getAllClients();
    this.clientId = this.clients[0].clientId;
    this.clientChange();
  }

}
