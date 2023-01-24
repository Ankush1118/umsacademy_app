import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-avatar-round',
  templateUrl: './avatar-round.component.html',
  styleUrls: ['./avatar-round.component.scss'],
})
export class AvatarRoundComponent implements OnInit {

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
