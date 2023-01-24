import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'starter',
    loadChildren: () => import('./pages/starter/starter.module').then(m => m.StarterPageModule)
  },
  {
    path: 'visit/:username',
    loadChildren: () => import('./pages/visit/visit.module').then( m => m.VisitPageModule)
  },
  {
    path: 'send-connect',
    loadChildren: () => import('./pages/send-connect/send-connect.module').then( m => m.SendConnectPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad : [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'branch-plan',
    loadChildren: () => import('./pages/branch-plan/branch-plan.module').then(m => m.BranchPlanPageModule)
  },
  // { path: '**', redirectTo: 'starter', pathMatch: 'full' },


  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)

  },


  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
  },
  {
    path: 'search-social',
    loadChildren: () => import('./pages/search-social/search-social.module').then(m => m.SearchSocialPageModule)
  },
  {
    path: 'add-social',
    loadChildren: () => import('./pages/add-social/add-social.module').then(m => m.AddSocialPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'add-profile',
    loadChildren: () => import('./pages/add-profile/add-profile.module').then(m => m.AddProfilePageModule)
  },
  {
    path: 'add-item',
    loadChildren: () => import('./pages/add-item/add-item.module').then(m => m.AddItemPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'list-social-section',
    loadChildren: () => import('./pages/list-social-section/list-social-section.module').then(m => m.ListSocialSectionPageModule)
  },
  {
    path: 'add-social-section',
    loadChildren: () => import('./pages/add-social-section/add-social-section.module').then(m => m.AddSocialSectionPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'drawer',
    loadChildren: () => import('./pages/drawer/drawer.module').then(m => m.DrawerPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsPageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./pages/share/share.module').then(m => m.SharePageModule)
  },
  {
    path: 'activate-tag',
    loadChildren: () => import('./pages/activate-tag/activate-tag.module').then(m => m.ActivateTagPageModule)
  },
  
  {
    path: 'direct-mode',
    loadChildren: () => import('./pages/direct-mode/direct-mode.module').then(m => m.DirectModePageModule)
  },
  {
    path: 'post-signup',
    loadChildren: () => import('./pages/post-signup/post-signup.module').then( m => m.PostSignupPageModule)
  },
  {
    path: 'change-username',
    loadChildren: () => import('./pages/change-username/change-username.module').then( m => m.ChangeUsernamePageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendancePageModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('./pages/assignment/assignment.module').then(m => m.AssignmentPageModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./pages/exam/exam.module').then(m => m.ExamPageModule)
  },
  {
    path: 'fees',
    loadChildren: () => import('./pages/fees/fees.module').then(m => m.FeesPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then(m => m.ResultPageModule)
  },
  {
    path: 'syllabus',
    loadChildren: () => import('./pages/syllabus/syllabus.module').then(m => m.SyllabusPageModule)
  },
  {
    path: 'medical-report',
    loadChildren: () => import('./pages/medical-report/medical-report.module').then(m => m.MedicalReportPageModule)
  },
  {
    path: 'meal-report',
    loadChildren: () => import('./pages/meal-report/meal-report.module').then(m => m.MealReportPageModule)
  },
  {
    path: 'health-report',
    loadChildren: () => import('./pages/health-report/health-report.module').then(m => m.HealthReportPageModule)
  },
  {
    path: 'subscription-report',
    loadChildren: () => import('./pages/subscription-report/subscription-report.module').then(m => m.SubscriptionReportPageModule)
  },
  {
    path: 'transaction-report',
    loadChildren: () => import('./pages/transaction-report/transaction-report.module').then(m => m.TransactionReportPageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./pages/plan/plan.module').then( m => m.PlanPageModule)
  },
  {
    path: 'subscription-report/subscription-client',
    loadChildren: () => import('./pages/subscription-client/subscription-client.module').then( m => m.SubscriptionClientPageModule)
  },
  {
    path: 'plan-subscription',
    loadChildren: () => import('./pages/plan-subscription/plan-subscription.module').then( m => m.PlanSubscriptionPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'deleted-clients',
    loadChildren: () => import('./pages/deleted-clients/deleted-clients.module').then(m => m.DeletedClientsPageModule)
  },
  {path: '**', redirectTo: 'starter', pathMatch: 'full'},
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
