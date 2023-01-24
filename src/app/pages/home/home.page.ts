import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../services/user.service";
import {DisplayService} from "../../services/display.service";
import {User} from "../../model/user";
import {UserProfileViewComponent} from "../../component/user-profile-view/user-profile-view.component";
import {FunctionsService} from "../../utilities/functions.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('userProfileViewComponent') userProfileViewComponent : UserProfileViewComponent;

  public user: User = null;
  public isEditMode: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private displayService: DisplayService,
              private fun: FunctionsService
  ) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.loadUser();
  }


  private loadUser() {
    try {
      this.user = null;
      if(this.userProfileViewComponent){
        this.userProfileViewComponent.refresh();
      }
      this.user = this.userService.getUser();
    } catch (e) {
      this.displayService.toast(e)
    }
  }


  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }


}
