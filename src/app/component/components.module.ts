import {NgModule} from '@angular/core';
import {CircleIconButtonComponent} from './circle-icon-button/circle-icon-button.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {IonicModule} from '@ionic/angular';
import {IconLabelComponent} from './icon-label/icon-label.component';
import {TitleLineActionComponent} from './title-line-action/title-line-action.component';
import {CommonModule} from '@angular/common';
import {TitleActionHeaderComponent} from './title-action-header/title-action-header.component';
import {FooterPoptaggComponent} from './footer-poptagg/footer-poptagg.component';
import {UserViewComponent} from "./user-view/user-view.component";
import firebase from "firebase";
import {LoaderComponent} from "./loader/loader.component";
import {UserProfileViewComponent} from "./user-profile-view/user-profile-view.component";
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './add-client/add-client.component';
import { AddClientPlanComponent } from './add-clientPlan/add-clientPlan.component';
import { PlanViewComponent } from './plan-view/plan-view.component';
import { ClientFilterBarComponent } from './client-filter-bar/client-filter-bar.component';
import { ClientSearchBarComponent } from './client-search-bar/client-search-bar.component';
import { PlanLabelComponent } from './plan-label/plan-label.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { HealthFilterBarComponent } from './health-filter-bar/health-filter-bar.component';
import { MealFilterBarComponent } from './meal-filter-bar/meal-filter-bar.component';
import { MedicalFilterBarComponent } from './medical-filter-bar/medical-filter-bar.component';
import { MealViewComponent } from './meal-view/meal-view.component';
import { HealthViewComponent } from './health-view/health-view.component';
import { MedicalViewComponent } from './medical-view/medical-view.component';
import { MealPhotoComponent } from './meal-photo/meal-photo.component';
import { SubscriptionFilterBarComponent } from './subscription-filter/subscription-filter-bar.component';
import { SubscriptionViewComponent } from './subscription-view/subscription-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionFilterBarComponent } from './transaction-filter-bar/transaction-filter-bar.component';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';
import { AvatarRoundComponent } from './avatar-round/avatar-round.component';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { SubscriptionClientViewComponent } from './subscription-client-view/subscription-client-view.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIonicImageViewerModule  
  ],
    declarations: [
        CircleIconButtonComponent,
        SearchBarComponent,
        IconLabelComponent,
        TitleLineActionComponent,
        TitleActionHeaderComponent,
        FooterPoptaggComponent,
        UserViewComponent,
        LoaderComponent,
        UserProfileViewComponent,
        AddClientComponent,
        AddClientPlanComponent,
        PlanViewComponent,
        ClientFilterBarComponent,
        ClientSearchBarComponent,
        PlanLabelComponent,
        EditPhotoComponent,
        HealthFilterBarComponent,
        MealFilterBarComponent,
        MedicalFilterBarComponent,
        MealViewComponent,
        HealthViewComponent,
        MedicalViewComponent,
        MealPhotoComponent,
        SubscriptionFilterBarComponent,
        SubscriptionViewComponent,
        TransactionFilterBarComponent,
        TransactionViewComponent,
        AvatarRoundComponent,
        SubscriptionClientViewComponent,
    ],
    exports: [
        CircleIconButtonComponent,
        SearchBarComponent,
        IconLabelComponent,
        TitleLineActionComponent,
        TitleActionHeaderComponent,
        FooterPoptaggComponent,
        UserViewComponent,
        LoaderComponent,
        UserProfileViewComponent,
        AddClientComponent,
        AddClientPlanComponent,
        PlanViewComponent,
        ClientFilterBarComponent,
        ClientSearchBarComponent,
        PlanLabelComponent,
        EditPhotoComponent,
        HealthFilterBarComponent,
        MealFilterBarComponent,
        MedicalFilterBarComponent,
        MealViewComponent,
        HealthViewComponent,
        MedicalViewComponent,
        MealPhotoComponent,
        SubscriptionFilterBarComponent,
        SubscriptionViewComponent,
        TransactionFilterBarComponent,
        TransactionViewComponent,
        AvatarRoundComponent,
        SubscriptionClientViewComponent,
    ]

})

export class ComponentsModule {
}
