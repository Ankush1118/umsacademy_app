import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {GenericService} from 'src/app/services/api/generic.service';
import {FunctionsService} from 'src/app/utilities/functions.service';
import {PortfolioService} from "../../services/portfolio.service";
import {Section} from "../../model/Section";
import {Icon} from "../../model/Icon";
import {AddSocialSectionPage} from "../add-social-section/add-social-section.page";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.scss'],
})
export class AddItemPage implements OnInit {

  section: any = {};
  sections: Section[];
  sectionFilter: Section = null;
  sectionId: number = null;
  customSectionName: string;
  allIcons: Icon[] = [];
  searchInput : string = ''
  constructor(private fun: FunctionsService, private genericService: GenericService,
              private route: ActivatedRoute, private alertCtrl: AlertController,
              private portfolioService: PortfolioService,
              private router: Router,
              private modalController: ModalController,
              private navController : NavController
  ) {
    this.fetchRouterData()
  }

  ngOnInit() {

  }


  fetchRouterData() {
    const data = this.router.getCurrentNavigation().extras.state;
    if (data) {
      this.sectionId = data.sectionId ? data.sectionId : null;
    }
  }

  async ionViewDidEnter() {
    await this.loadSections();
    await this.loadIcons();
  }

  async loadSections() {
    this.sections = await this.portfolioService.getAllSections();
   // this.clubAll(this.sections);
  }

  async loadIcons() {
    this.allIcons = await this.portfolioService.getAllItems();
   // this.clubAll(this.sections);
  }

  async onIconClicked(icon: Icon) {
    const modal = await this.modalController.create({
      component: AddSocialSectionPage,
      componentProps: {icon: icon, sectionId: this.sectionId, isAdd: true}
    });
    await modal.present();
    const data : any = await modal.onDidDismiss();
    if(data.data.isBack){
      this.navController.back();
    }

  }

  async addSection(sectionName: string) {
    const response = await this.portfolioService.addSection(sectionName);
    this.sectionId = response;
    return;
  }

  setSectionFilter(section: Section) {
    this.sectionFilter = section
  }

  isSectionHidden(section: Section) {
    if (this.sectionFilter != null && section.sectionId != this.sectionFilter.sectionId) {
      return true;
    }
    return false;
  }

  clubAll(sections: Section[]) {
    if (!sections) {
      return
    }
    this.allIcons = [];
    for (let section of sections) {
      for (let icon of section.icons) {
        this.allIcons.push(icon)
     }
    }
  }

  checkSearch(icon: Icon) {
    if (!this.searchInput || this.searchInput.length < 1) {
      return false;
    }

    if (icon.iconName.toLowerCase().indexOf(this.searchInput.toLowerCase()) < 0) {
      return true
    }
  }
}
