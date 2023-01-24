import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from "@ionic/angular";
import {PortfolioService} from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-title-action-header',
  templateUrl: './title-action-header.component.html',
  styleUrls: ['./title-action-header.component.scss'],
})
export class TitleActionHeaderComponent implements OnInit {
  @Input() title: string = 'Title';
  @Input() sectionId: number;
  @Output() onEdit: any = new EventEmitter();
  @Output() onReorder: any = new EventEmitter();
  @Output() refresh: any = new EventEmitter();
  @Input() isEditMode: boolean = false;
  @Input() centerTitle: boolean = false;

  constructor(private router: Router,
              private alertController: AlertController,
              private portfolioService: PortfolioService
  ) {
  }

  ngOnInit() {
  }


  reorderClicked() {
    this.onReorder.emit();
  }

  async editClicked() {
    const alert = await this.alertController.create({
      header: "Change Name",
      inputs: [
        {
          placeholder: "Type Section Name here",
          name: "name",
          type: "text",
          value: this.title
        }
      ],
      buttons: [

        {
          text: 'Close',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.updateName(data.name)
          }
        }
      ]
    })

    await alert.present();
  }

  async updateName(name: string) {
    await this.portfolioService.updateSection(this.sectionId, name);
    this.refresh.emit();
  }

  async deleteClick() {
    const alert = await this.alertController.create({
      header: 'Delete Section',
      subHeader : 'Are you sure to delete this section?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: async () => {
            await this.portfolioService.deleteSection(this.sectionId);
            this.refresh.emit();
          }
        }
      ]
    })
    alert.present();
  }
}
