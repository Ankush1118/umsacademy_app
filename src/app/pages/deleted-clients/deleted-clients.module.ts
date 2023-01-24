import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletedClientsPageRoutingModule } from './deleted-clients-routing.module';

import { DeletedClientsPage } from './deleted-clients.page';
import { ComponentsModule } from 'src/app/component/components.module';
import { DeletedClientViewComponent } from './deleted-client-view/deleted-client-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletedClientsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DeletedClientsPage, DeletedClientViewComponent]
})
export class DeletedClientsPageModule {}
