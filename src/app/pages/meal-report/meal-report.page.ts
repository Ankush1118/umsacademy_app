import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Meal } from 'src/app/model/meal';
import { User } from 'src/app/model/user';
import { MealService } from 'src/app/services/meal.service';
import { UserService } from 'src/app/services/user.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-meal-report',
  templateUrl: './meal-report.page.html',
  styleUrls: ['./meal-report.page.scss'],
})
export class MealReportPage implements OnInit {

  public meal: Meal;
  user: User;
  meals: any[] = [];
  searchInput: string = '';
  // mealDate: any;
  public mealDate: any;


  constructor(private userService: UserService,
              private mealService: MealService,
              private modalController: ModalController
) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.getAllMeals();
    this.mealDate =formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530');
  }

  ionViewDidEnter() {
    // this.getAllMeals();
  }

  refresh(){
    this.getAllMeals();
  }


  checkSearch(meal: Meal) {
    if (!this.searchInput || this.searchInput.length < 1) {
      return false;
    }

    if (meal.clientName.toLowerCase().indexOf(this.searchInput.toLowerCase()) < 0) {
      return true
    }
  }


  private async getAllMeals() {
    this.meals = await this.mealService.getMealByDate(this.mealDate);
    console.log(this.meals);
  }

  async showSetDataModal() {
  if (this.meal.mealType!='' && this.meal.mealId) {
    return;
    }
  }
  

}
