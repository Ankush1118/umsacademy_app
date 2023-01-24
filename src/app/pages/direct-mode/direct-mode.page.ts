import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UserService} from 'src/app/services/user.service';
import {Section} from "../../model/Section";
import {PortfolioService} from "../../services/portfolio.service";
import {User} from "../../model/user";
import {Icon} from "../../model/Icon";

@Component({
  selector: 'app-direct-mode',
  templateUrl: './direct-mode.page.html',
  styleUrls: ['./direct-mode.page.scss'],
})
export class DirectModePage implements OnInit {

  public sections: Section[] = [];
  public user: User;
  public directIcon: Icon;

  constructor(private modalController: ModalController,
              private portfolioService: PortfolioService,
              private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadUser();
    this.loadPortfolio();
    this.loadDirectIcon();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  loadUser() {
    this.user = this.userService.getUser();
  }

  async loadPortfolio() {
    this.sections = await this.portfolioService.getUserPortfolio();
    console.log(this.sections);
  }

  async updateDirectIcon(iconId: number) {
    await this.userService.updateDirectIcon(iconId);
    this.loadDirectIcon();
  }

  async turnOffDirectMode() {
    await this.userService.updateDirectIcon(null);
    this.loadDirectIcon();
  }

  private async loadDirectIcon() {
    this.directIcon = await this.portfolioService.getItemByIcon(this.userService.getUser().directIconId)
  }
}
