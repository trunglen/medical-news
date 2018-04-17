import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SpinnerComponent } from './spinner/spinner.component';
import { LoggerService } from './logger.service';
import { SpinnerService } from './spinner/spinner.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpService, HttpErrorService } from '../../x/http/http.service';
import { AuthService } from '../../x/http/auth.service';
import { SharedModule } from '../shared/shared.module';
import { ToastNotificationService } from '../../x/http/toast-notification.service';
import { AuthGuardService, SuperAdminGuardService } from '../auth/auth-guard.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    SpinnerComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  declarations: [SpinnerComponent, SidebarComponent, HeaderComponent],
  providers: [
    LoggerService,
    SpinnerService,
    HttpService,
    ToastNotificationService,
    AuthGuardService,
    SuperAdminGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorService,
      multi: true
    }
  ]
})
export class CoreModule { }
