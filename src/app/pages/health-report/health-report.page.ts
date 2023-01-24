import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Health } from 'src/app/model/health';
import { User } from 'src/app/model/user';
import { HealthService } from 'src/app/services/health.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-report',
  templateUrl: './health-report.page.html',
  styleUrls: ['./health-report.page.scss'],
})
export class HealthReportPage implements OnInit {

  public health: Health;
  user: User;
  healthes: any[] = [];

  searchInput: string = '';
  public healthDate: string;
  updateDt: any;


  constructor( private userService: UserService,
              private healthService: HealthService,
              private modalController: ModalController
) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.getAllHealthStatus();
    this.updateDt =formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530');

  }

  ionViewDidEnter() {
    // this.getAllHealthStatus();
  }

  refresh(){
    this.getAllHealthStatus();
  }

  private async getAllHealthStatus() {
    this.healthes = await this.healthService.getHealthStatusByDate(this.updateDt);
    console.log(this.healthes);
}

  async showSetDataModal() {
    if (this.health.weight!= 0 && this.health.healthstatusId) {
      return;
    }
  }

  checkSearch(health: Health) {
    if (!this.searchInput || this.searchInput.length < 1) {
      return false;
    }

    if (health.clientName.toLowerCase().indexOf(this.searchInput.toLowerCase()) < 0) {
      return true
    }
  }

}
