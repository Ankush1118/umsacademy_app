import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PortfolioService} from "../../services/portfolio.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-icon-label',
  templateUrl: './icon-label.component.html',
  styleUrls: ['./icon-label.component.scss'],
})
export class IconLabelComponent implements OnInit {

  @Input() image: string = null;
  @Input() icon: string = null;
  @Input() label: string = 'Website';
  @Input() isChecked: any = false;
  @Input() isEditMode: boolean = false;
  @Output() edit: EventEmitter<any> = new EventEmitter();

  constructor(private portfolioService: PortfolioService,
              private alertController: AlertController
  ) {
  }

  ngOnInit() {
    console.log(this.image);
  }

  editClicked() {
    this.edit.emit();
  }

  imageError() {
    this.image = 'assets/icon/icon-link.png'
  }
}
