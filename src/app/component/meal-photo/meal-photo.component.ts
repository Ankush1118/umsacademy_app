import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-meal-photo',
  templateUrl: './meal-photo.component.html',
  styleUrls: ['./meal-photo.component.scss'],
})
export class MealPhotoComponent implements OnInit {

  baseImageUrl = environment.uploadUrl+'mealPhotos/';

  @Input() imageUrl = 'assets/bjork-live.png';
  @Input() iconUrl = 'assets/icon/noun_pencil.svg';
  @Input() size = 100;
  @Input() bubbleSize = 40;
  @Input() isEditMode: boolean = false;
  @Input() bubbleFilled: boolean = false;
  @Output() onBubbleClick = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }


  getBubbleTop() {
    return this.size - this.bubbleSize / 2;
  }

  getBubbleLeft() {
    return (this.size / 2) - (this.bubbleSize / 2);
  }

  onBubbleClicked() {
    this.onBubbleClick.emit();
  }
}
