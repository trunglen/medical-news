import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService, SuperAdminGuardService } from './auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [//home component load truoc spinner nen k de snotify trong spinner
      { path: 'post', loadChildren: './post/post.module#PostModule' },
      { path: 'category', loadChildren: './category/category.module#CategoryModule', canActivate: [SuperAdminGuardService] },
      { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [SuperAdminGuardService] },
      { path: 'dashboard', component: DashboardComponent },
    ],
    canActivate: [AuthGuardService]
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
