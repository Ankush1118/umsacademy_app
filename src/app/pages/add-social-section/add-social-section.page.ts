import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {GenericService} from 'src/app/services/api/generic.service';
import {FunctionsService} from 'src/app/utilities/functions.service';
import {Item} from "../../model/Item";
import {Icon} from "../../model/Icon";
import {PortfolioService} from "../../services/portfolio.service";

@Component({
  selector: 'app-add-social-section',
  templateUrl: './add-social-section.page.html',
  styleUrls: ['./add-social-section.page.scss'],
})
export class AddSocialSectionPage implements OnInit {

  @Input() icon: Icon;
  @Input() sectionId: number;
  @Input() isAdd :boolean = false;
  constructor(private genericService: GenericService, private route: ActivatedRoute,
              private modalCtrl: ModalController, private fun: FunctionsService,
              private portfolioService: PortfolioService) {
  }

  ngOnInit() {
    if (this.icon.item == null) {
      this.icon.item = new Item()
    }
  }

  ionViewDidEnter() {

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async addItem() {
    await this.portfolioService.addItem(this.icon, this.sectionId);
    this.dismiss();
  }

  async updateItem(){
    await this.portfolioService.updateItem(this.icon.item);
    this.dismiss();
  }

  async deleteItem(item: Item) {
    await this.portfolioService.deleteItem(item.itemId);
    this.dismiss();
  }

}
