import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  public user: User = null;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router
  ) {
    this.activatedRoute.params.subscribe(data => {
      console.log(data)
      if (data && data.username) {
        this.loadUserProfile(data.username);
      }

    })

  }

  ngOnInit() {
  }

  async loadUserProfile(username: string) {
    this.user = await this.userService.getUserByUsername(username);
    console.log(this.user);
  }



}
