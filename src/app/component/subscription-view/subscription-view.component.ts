import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { ClientSubscription } from 'src/app/model/clientSubscription';
import { ClientSubscriptionService } from 'src/app/services/clientSubscription.service';

@Component({
  selector: 'app-subscription-view',
  templateUrl: './subscription-view.component.html',
  styleUrls: ['./subscription-view.component.scss'],
})
export class SubscriptionViewComponent implements OnInit {
  
  @Input() subscription : ClientSubscription;
  @Output() refresh: any = new EventEmitter();

  clients: any[] = [];


  constructor(private router: Router, private clientSubscriptionService: ClientSubscriptionService) { }

  ngOnInit() {
    // this.getAllSubscriptionByClient();
  }

  openProfile(clientSubscription) {
    const extras: NavigationBehaviorOptions = {
      state: {
        clientSubscription: clientSubscription
      }
    }
    this.router.navigateByUrl('subscription-report/subscription-client', extras);
  }

  private async getAllSubscriptionByClient() {
    this.clients = await this.clientSubscriptionService.getSubscriptionByClient(this.subscription.clientId);
    console.log(this.clients);
  }


}
