import {Injectable} from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import {String} from "typescript-string-operations";
import { ValidationUtil } from '../utilities/ValidationUtil';
import { DisplayService } from './display.service';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  static readonly nodePlan: string = 'plan/';
  static readonly NodeAddPlan: string = 'plan/addPlan';
  static readonly NodeGetAllPlan: string = 'plan/getAllPlan';
  static readonly NodeDeletePlan: string = 'plan/deletePlan';
  static readonly NodeActivePlan: string = 'plan/activePlan';
  static readonly NodeInActivePlan: string = 'plan/inActivePlan';
  static readonly NodeGetPlanFeaturesByPlanId = 'plan/getPlanFeaturesByPlanId?planId={0}';

  constructor(
              private restService: RestService,
              private displayService: DisplayService,
              private storageService: StorageService,
              private http: HttpClient
              
  ) {

  }

  async getAllPlans() {
    try {
      const res: any = await this.restService.get(PlanService.NodeGetAllPlan);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  public async addPlan(plan: any) {

    const response = await this.restService.post(PlanService.NodeAddPlan, plan);
   // await this.getPlans();
    return response;
  }

  public async deletePlan(plan: any) {

    const response = await this.restService.post(PlanService.NodeDeletePlan, plan);
   // await this.getPlans();
    return response;
  }

  public async activePlan(plan: any) {
    const response = await this.restService.post(PlanService.NodeActivePlan, plan);
    return response;
  }

  public async inActivePlan(plan: any) {
    const response = await this.restService.post(PlanService.NodeInActivePlan, plan);
    return response;
  }

  public async getPlanFeaturesByPlanId(planId){
    const response = await this.restService.get(String.Format(PlanService.NodeGetPlanFeaturesByPlanId, planId));
    return response;
  }
}

