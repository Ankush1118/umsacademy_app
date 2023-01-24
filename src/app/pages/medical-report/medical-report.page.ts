import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medical } from 'src/app/model/medical';
import { User } from 'src/app/model/user';
import { MedicalService } from 'src/app/services/medical.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medical-report',
  templateUrl: './medical-report.page.html',
  styleUrls: ['./medical-report.page.scss'],
})
export class MedicalReportPage implements OnInit {

  public medical: Medical;
  user: User;
  medicals: any[] = [];

  clientId: string;
  searchInput: string = '';
  public medicalDate: string;


  constructor(private userService: UserService,
              private medicalService: MedicalService,
              private modalController: ModalController
            ) {
   }

  async ngOnInit() {
    this.getAllMedicals();

    // try{
    //   this.user = await this.userService.getUser();
    // console.log(this.user);
    // this.getAllMedicals();
    // }catch(e){
    //   console.log(e);
    // }
  }

  ionViewDidEnter() {
    
    this.getAllMedicals();
   }

  refresh(){
    this.getAllMedicals();
  }

  private async getAllMedicals() {
    try{
      this.medicals = await this.medicalService.getMedicalByClient(this.clientId);
      console.log(this.medicals);
    }catch(e){
      console.log(e);
    }
  }

  
  

  checkSearch(medical: Medical) {
    if (!this.searchInput || this.searchInput.length < 1) {
      return false;
    }

    if (medical.clientName.toLowerCase().indexOf(this.searchInput.toLowerCase()) < 0) {
      return true
    }
  }

  async showSetDataModal() {
    if (this.medical.clientName !='' && this.medical.medicalId) {
      return;
    }
  }

  

}
