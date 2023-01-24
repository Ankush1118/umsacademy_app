import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {environment} from "../../../environments/environment";
import {Section} from "../../model/section";
import {FunctionsService} from "../../utilities/functions.service";
import {FireauthService} from "../../services/api/fireauth.service";
import {ActionSheetController, AlertController, LoadingController, ModalController} from "@ionic/angular";
import {File} from "@ionic-native/file/ngx";
import {Crop} from "@ionic-native/crop/ngx";
import {FileTransfer} from "@ionic-native/file-transfer/ngx";
import {GenericService} from "../../services/api/generic.service";
import {NavigationExtras, Router} from "@angular/router";
import {PortfolioService} from "../../services/portfolio.service";
import {UserService} from "../../services/user.service";
import {DisplayService} from "../../services/display.service";
import {Icon} from "../../model/Icon";
import {AddSocialSectionPage} from "../../pages/add-social-section/add-social-section.page";
import {SendConnectPage} from "../../pages/send-connect/send-connect.page";
import { LoginPage } from 'src/app/pages/login/login.page';
import { BranchPlanPage } from 'src/app/pages/branch-plan/branch-plan.page';
import { EditPhotoComponent } from '../edit-photo/edit-photo.component';
import { SubscriptionService } from 'src/app/services/api/subscription.service';
import { PlanService } from 'src/app/services/plan.service';
import { formatDate } from '@angular/common';
//import { ClientPage } from '../../pages/client/client.page';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
})
export class UserProfileViewComponent implements OnInit {
  @ViewChild('editPhoto') editPhoto: EditPhotoComponent;

  @Input() user: User = null;
  @Input() isEditMode: boolean = false;
  @Input() isVisitMode: boolean = false;
  logoPath: string = environment.uploadUrl + "logos/"
  photoPath: string = environment.uploadUrl + "photos/"

  branchUser: User;
  userProfile: any = {};
  croppedImagePath = "";
  photoUrl = "";
  logoUrl = "";

  sections: Section[] = [];

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  
  endDate: Date;
  // public subscription: any;
  subscriptions: any;    
  planValid: boolean = false;
  noPlan: boolean = false;
  planFeatures: any[] = [];

  constructor(private fun: FunctionsService,
              private fireauthService: FireauthService,
              private loadingController: LoadingController,
              public actionSheetController: ActionSheetController,
              private file: File,
              private crop: Crop,
              private transfer: FileTransfer,
              private genericService: GenericService,
              private router: Router,
              private modalController: ModalController,
              private portfolioService: PortfolioService,
              private userService: UserService,
              private displayService: DisplayService, private subscriptionService: SubscriptionService,
              private planService: PlanService,
              private alertController: AlertController
  ) {

  }

  ngOnInit() {
    // this.loadPortfolio();
    this.getSubscription();
  }


  async loadPortfolio() {
    console.log("user id:"+this.user.userId)
    this.sections = await this.portfolioService.getUserPortfolio(this.user.userId, this.user.mode);
    console.log("Sections:")
    console.log(this.sections)
  }

  async photoUpdate(urlNode, nodeName) {
    document.getElementById('fileInput').onchange = (event) => {
      this.uploadPhoto(event, urlNode, nodeName)
    };
    document.getElementById('fileInput').click();
  }

  get logo() {
    if (this.user.logoUrl && this.user.logoUrl.length > 0) {
      return environment.logoPreUrl + this.user.logoUrl;
    }
    return 'https://www.coditt.com/images/LogoPlaceholder.png';
  }

  async uploadPhoto(event: any, urlNode, nodeName) {
    const file = event.target.files[0];
    await this.editPhoto.uploadPhoto(file, urlNode, nodeName)
  }

  addItemClicked(sectionId: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        sectionId: sectionId
      }
    }
    this.router.navigate(['add-item'], navigationExtras);
  }

  addSection() {
    this.router.navigate(['add-item']);
  }

  refresh() {
    this.loadPortfolio();
    this.getSubscription();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }

  isSectionEmpty(section: Section) {
    let count = 0;
    for (let icon of section.icons) {
      if (icon.item && icon.item.value) {
        count++
      }
    }
    return count < 1;
  }

  async editIcon(icon: Icon, sectionId: number) {
    console.log("Icon clicked"+icon)
    console.log("Icon clicked"+sectionId)
    const modal = await this.modalController.create({
      component: AddSocialSectionPage,
      componentProps: {icon: icon, sectionId: sectionId}
    });
    await modal.present();

    await modal.onDidDismiss();
    this.refresh()

  }

  // async itemClicked(icon, sectionId){
  //   console.log("icon clicked")
  //   console.log(icon)
  //   if(icon.iconId==1){
  //     const modal = await this.modalController.create({
  //       component: ClientPage,
  //       componentProps: {icon: icon, sectionId: sectionId}
  //     });
  //     await modal.present();

  //   await modal.onDidDismiss();
  //   this.refresh()
  //   }
  // }


  //Photo Methods Start

  // pickPhoto(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //   //  this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
  //     if(!imageData.includes("file://")){
  //       imageData = "file://"+imageData;
  //     }
  //  //   alert(imageData);
  //     this.cropPhoto(imageData)
  //
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  // async selectPhoto() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Select Photo",
  //     buttons: [{
  //         text: 'Remove Current Photo',
  //         handler: () => {
  //           this.removePhoto();
  //         }
  //       },
  //       {
  //         text: 'Take Photo',
  //         handler: () => {
  //           this.pickPhoto(this.camera.PictureSourceType.CAMERA);
  //         }
  //       },
  //       {
  //         text: 'Choose From Library',
  //         handler: () => {
  //           this.pickPhoto(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  // cropPhoto(fileUrl) {
  //   this.crop.crop(fileUrl, { quality: 50 })
  //     .then(
  //       newImage => {
  //         console.log('new image path is: ' + newImage);
  //         const fileTransfer: FileTransferObject = this.transfer.create();
  //         const uploadOpts: FileUploadOptions = {
  //           fileKey: "photo", // change fileKey
  //           chunkedMode: false, // add chunkedMode
  //           mimeType: "multipart/form-data", // add mimeType
  //           fileName: this.userProfile.uid+".jpg",
  //           params : {'uid':this.userProfile.uid},
  //          // headers: {'Authorization':'Bearer ' + val, 'Content-Type': 'application/x-www-form-urlencoded'}
  //         };
  //
  //         fileTransfer.upload(newImage, this.baseUrl+'uploadPhoto', uploadOpts)
  //          .then((data) => {
  //           this.genericService.getSingle('user/getUserByUid?uid='+this.userProfile.uid).subscribe(
  //             data => {
  //               if(data.status){
  //                 localStorage.setItem('user',JSON.stringify(data.data))
  //                 this.userProfile =JSON.parse(localStorage.getItem('user'));
  //                 this.loadingController.dismiss().then(() => console.log('dismissed'));
  //                 this.fun.presentToast("Photo Uploaded", true, 'bottom', 2100);
  //               }else{
  //                 localStorage.removeItem('user');
  //                 this.loadingController.dismiss().then(() => console.log('dismissed'));
  //               }
  //             },
  //             err => {console.log('HTTP Error', err)
  //               localStorage.removeItem('user');
  //               this.loadingController.dismiss().then(() => console.log('dismissed'));
  //             },
  //               () => console.log('HTTP request completed.')
  //           );
  //           this.loadingController.dismiss().then(() => console.log('dismissed'));
  //          }, (err) => {
  //           this.loadingController.dismiss().then(() => console.log('dismissed'));
  //          //  alert(JSON.stringify(err));
  //           this.fun.presentToast("Something Went Wrong", true, 'bottom', 2100);
  //          });
  //       },
  //       error => {
  //         alert('Error cropping Photo' + JSON.stringify(error));
  //       }
  //     );
  // }

  removePhoto() {
    this.fun.presentLoading();
    this.genericService.getSingle('user/removePhotoByUid?uid=' + this.userProfile.uid).subscribe(
      data => {
        if (data.status) {
          localStorage.setItem('user', JSON.stringify(data.data))
          this.userProfile = JSON.parse(localStorage.getItem('user'));
          this.loadingController.dismiss().then(() => console.log('dismissed'));
          this.fun.presentToast("Photo Removed", true, 'bottom', 2100);
        } else {
          this.loadingController.dismiss().then(() => console.log('dismissed'));
          this.fun.presentToast("Error in Photo Remove", true, 'bottom', 2100);
        }
      },
      err => {
        console.log('HTTP Error', err)
        this.loadingController.dismiss().then(() => console.log('dismissed'));
        this.fun.presentToast("Something Went Wrong", true, 'bottom', 2100);

      },
      () => console.log('HTTP request completed.')
    );

  }

  async openBranchPlan() {
    const modal = await this.modalController.create({
    component: BranchPlanPage,
    showBackdrop: false,
      componentProps: {subscription: this.subscriptions[0]}
    })
    modal.onDidDismiss().then((modelData) => {
      console.log(modelData);
        if(modelData.data=='close'){
         this.getSubscription();
          this.closeModal();
        }
    });
    return await modal.present();
  }

  async getSubscription(){
    const res = await this.subscriptionService.getSubscriptionByBranch(this.user.branchId);
    this.subscriptions = res.data;
    if(res.status){
      this.planValid = true;
      const planFeaturesRes= await this.planService.getPlanFeaturesByPlanId(this.subscriptions[0].planId);
      this.planFeatures = planFeaturesRes.data;
      this.noPlan = false;
    }else{
      this.noPlan = true;
    }
    
  }

  // async getSubscription(){
  //   console.log(this.user.branchId);
  //   const res = await this.subscriptionService.getSubscriptionByBranch(this.user.branchId);
  //   console.log(res);
  //   this.subscriptions = res.data;
  //   console.log(this.subscriptions);
  //   if(this.subscriptions.subscriptionStatus =='active'){

  //     this.endDate = new Date(this.subscriptions.expiryDate);
  //     console.log(this.endDate);
  //     let today = new Date();
  //     var time = this.endDate.getTime() - today.getTime();
  //     var days = time / (1000 * 3600 * 24);
  //     console.log(days);
      
  //     if(days > 0 && days<= 5){
  //       this.planValid = true;
        
  //     }else{
  //       this.planValid = false;
  //       this.noPlan = false;
  //     }
  //      const planFeaturesRes= await this.planService.getPlanFeaturesByPlanId(this.subscriptions.planId);
  //      this.planFeatures = planFeaturesRes.data;
  //   }else{
  //     this.noPlan = true;
  //   }
    
  // }


  //Photo Methods End

  //Logo Methods Start

  //  pickLogo(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //   //  this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
  //     if(!imageData.includes("file://")){
  //       imageData = "file://"+imageData;
  //     }
  //    // alert(imageData);
  //     this.cropLogo(imageData)
  //
  //   }, (err) => {
  //     // Handle error
  //     alert(JSON.stringify(err))
  //   });
  // }

  // async selectLogo() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Select Logo",
  //     buttons: [{
  //         text: 'Remove Current Logo',
  //         handler: () => {
  //           this.removeLogo();
  //         }
  //       },
  //       {
  //         text: 'Take Logo',
  //         handler: () => {
  //           this.pickLogo(this.camera.PictureSourceType.CAMERA);
  //         }
  //       },
  //       {
  //         text: 'Choose From Library',
  //         handler: () => {
  //           this.pickLogo(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         cssClass: 'cancelClass',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  // cropLogo(fileUrl) {
  //   this.fun.presentLoading();
  //   this.crop.crop(fileUrl, { quality: 50 })
  //   .then(
  //     newImage => {
  //       console.log('new image path is: ' + newImage);
  //       const fileTransfer: FileTransferObject = this.transfer.create();
  //       const uploadOpts: FileUploadOptions = {
  //         fileKey: "logo", // change fileKey
  //         chunkedMode: false, // add chunkedMode
  //         mimeType: "multipart/form-data", // add mimeType
  //         fileName: this.userProfile.uid+".jpg",
  //         params : {'uid':this.userProfile.uid},
  //        // headers: {'Authorization':'Bearer ' + val, 'Content-Type': 'application/x-www-form-urlencoded'}
  //       };
  //
  //       fileTransfer.upload(newImage, this.baseUrl+'uploadLogo', uploadOpts)
  //        .then((data) => {
  //         this.genericService.getSingle('user/getUserByUid?uid='+this.userProfile.uid).subscribe(
  //           data => {
  //             if(data.status){
  //               localStorage.setItem('user',JSON.stringify(data.data))
  //               this.userProfile =JSON.parse(localStorage.getItem('user'));
  //               this.loadingController.dismiss().then(() => console.log('dismissed'));
  //               this.fun.presentToast("Logo Uploaded", true, 'bottom', 2100);
  //             }else{
  //               localStorage.removeItem('user');
  //             }
  //           },
  //           err => {console.log('HTTP Error', err)
  //             localStorage.removeItem('user');
  //           },
  //             () => console.log('HTTP request completed.')
  //         );
  //         this.loadingController.dismiss().then(() => console.log('dismissed'));
  //
  //        }, (err) => {
  //         this.loadingController.dismiss().then(() => console.log('dismissed'));
  //        //  alert(JSON.stringify(err));
  //         this.fun.presentToast("Something Went Wrong", true, 'bottom', 2100);
  //        });
  //     },
  //     error => console.error('Error cropping image', error)
  //   );
  // }

  removeLogo() {
    this.fun.presentLoading();
    this.genericService.getSingle('user/removeLogoByUid?uid=' + this.userProfile.uid).subscribe(
      data => {
        if (data.status) {
          localStorage.setItem('user', JSON.stringify(data.data))
          this.userProfile = JSON.parse(localStorage.getItem('user'));
          this.loadingController.dismiss().then(() => console.log('dismissed'));
          this.fun.presentToast("Logo Removed", true, 'bottom', 2100);
        } else {
          this.fun.presentToast("Error in Logo Remove", true, 'bottom', 2100);
        }
      },
      err => {
        console.log('HTTP Error', err)
        this.fun.presentToast("Something Went Wrong", true, 'bottom', 2100);
        this.loadingController.dismiss().then(() => console.log('dismissed'));
      },
      () => console.log('HTTP request completed.')
    );

  }

  async connect() {
    const modal = await this.modalController.create({component: SendConnectPage});
    modal.present();
  }

  async closeModal() {
    const close:string = 'close';
    await this.modalController.dismiss(close);
    console.log("close button");
  }

  async menuNavigate(icon: any){
    if(icon.iconId==1){
      this.fun.navigate(icon.url);
    }
    if(icon.iconId==8){
      this.fun.navigate(icon.url);
    }
    if(icon.iconId==9){
      this.fun.navigate(icon.url);
    }
    if(icon.iconId==10){
      this.fun.navigate(icon.url);
    }
    if(this.planFeatures.length > 0){
      this.planFeatures.forEach(element => {
        if(element.iconId==icon.iconId){
          this.fun.navigate(icon.url);
        }
      });
    }
  }
  
}


