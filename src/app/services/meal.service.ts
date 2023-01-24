import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
import { SendConnect } from '../model/sendConnect';
import { UserService } from './user.service';
// import { Personal } from '../modal/customer';
import { BehaviorSubject } from 'rxjs';
// import {Student} from "../model/student";


@Injectable({
  providedIn: 'root'
})
export class MealService {

  public static readonly NodeConnects = 'meal/getAllStudentByLimit_get?studentId={0}';
  public static readonly NodeAddMeal = 'meal/addMeal';
  public static readonly NodeAllMeals = 'meal/getAllMeal';
  public static readonly NodeAllMealsByClient = 'meal/getMealByClientId?clientId={0}';
  public static readonly NodeMealById = 'meal/getMealById?mealId={0}';
  public static readonly NodeMealByDate = 'meal/getMealByDate?date={0}';
  public static readonly NodeDeleteMeal = 'meal/deleteMeal';

  constructor(private restService: RestService,
              private displayService: DisplayService,
            //   private userService: UserService
  ) {
  }


  async getAllMeals() {
    try {
      const res: any = await this.restService.get(MealService.NodeAllMeals);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getMealByDate(date:any) {
    try {
      const res: any = await this.restService.get(String.Format(MealService.NodeMealByDate, date));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

//   async addMeal(body) {
//     try {
//       const res: any = await this.restService.postFormData(MealService.NodeAddMeal, body);
//       return res;
//     } catch (e) {
//       this.displayService.toast(e);
//     }
//   }

  public async getClientMeals(clientId: any) {
    const response = await this.restService.get(String.Format(MealService.NodeAllMealsByClient, clientId));
    return response;
  }

  async delete(id: any) {
    try {
      const response = await this.restService.post(MealService.NodeDeleteMeal, {mealId: id})
      return response.message;
    } catch (e) {
      this.displayService.toast(e);
    }

  }

  public async getMealById(mealId) {
    try {
      const res: any = await this.restService.get(String.Format(MealService.NodeMealById, mealId));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }







//   public async addConnect(sendConnect: SendConnect) {

//     const body = {
//       studentId: this.userService.getStudent().studentId,
//       displayName: sendConnect.displayName,
//       email: sendConnect.email,
//       mobileNo : sendConnect.mobileNo

//     }

//     const response = await this.restService.post(StudentsService.NodeAddConnect, body);
//     return response;
//   }


}
