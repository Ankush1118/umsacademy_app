import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ClientPlan } from 'src/app/model/clientPlan';
import { ClientService } from 'src/app/services/clients.service';
import { ClientPlanService } from 'src/app/services/clientsPlan.service';
import { DisplayService } from 'src/app/services/display.service';
import { FunctionsService } from 'src/app/utilities/functions.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-clientPlan.component.html',
  styleUrls: ['./add-clientPlan.component.scss'],
})
export class AddClientPlanComponent implements OnInit {

  clientPlanForm: FormGroup;
  submitted = false;
  clientPlans: any[] = [];
  clientPlan: ClientPlan;
  isDeleted: any;
  isEdit: boolean=false;


  constructor(private modalController : ModalController, private formBuilder: FormBuilder,
    private fun: FunctionsService, private clientplanService: ClientPlanService, private displayService: DisplayService) { 
    this.clientPlanForm = this.formBuilder.group({
      planId: [''],
      planName: ['',[ Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      validity: ['', Validators.required],
      price: ['', Validators.required],
      isDeleted: [0],
      active: [1]
    });
  }

  ngOnInit() {
    this.getAllClientPlansByIsDeleted(this.isDeleted);
    console.log(this.clientPlan)
    if(this.clientPlan){
      this.clientPlanForm.patchValue({
        planId: this.clientPlan.planId,
        planName: this.clientPlan.planName,
        validity: this.clientPlan.validity,
        price: this.clientPlan.price,
        isDeleted: this.clientPlan.isDeleted,
        active: this.clientPlan.active
      });
    }else{
      this.isEdit=true;
      this.clientPlanForm.patchValue({ planId: "",  isDeleted : 0})
    }
  }

  get fCPlan() {
    return this.clientPlanForm.controls;
  }

  async closeModal() {
    const close:string = 'close';
    await this.modalController.dismiss(close);
    console.log("close button");
  }

  async savePlan() {
    console.log("submit")
    this.submitted= true
    if(this.clientPlanForm.invalid){
      return;
    }
    console.log(this.clientPlanForm.value)
    const plan = await this.clientplanService.addClientPlan(this.clientPlanForm.value);
    console.log(plan);
    if(plan) {
      await this.closeModal();
      this.displayService.toast("Plan Added/Edited Successfully");
      this.modalController.dismiss();
      // location.reload();
  
    }

  }

  private async getAllClientPlansByIsDeleted(isDeleted) {
    this.clientPlans = await this.clientplanService.getAllClientPlansByIsDeleted(isDeleted);
  //  this.updatePlans(this.clients);
    console.log(this.clientPlans);
}

//   getDate(e) {
//     let date = new Date(e.target.value).toISOString().substring(0, 10);
//     this.clientForm.get('dob').setValue(date, {
//        onlyself: true
//     })
//  }

  keyPressNumbers(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // alphaNumberOnly (e) {  // Accept only alpha numerics, not special characters 
  //   var regex = new RegExp("^[a-zA-Z0-9 ]+$");
  //   var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  //   if (regex.test(str)) {
  //       return true;
  //   }

  //   e.preventDefault();
  //   return false;
  // }

  // onPaste(e) {
  //   e.preventDefault();
  //   return false;
  // }


}
