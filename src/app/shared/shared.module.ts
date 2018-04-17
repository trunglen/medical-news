import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgxPaginationModule } from 'ngx-pagination';

import { PageTitleComponent } from './component/page-title/page-title.component';
import { SwitchComponent } from './component/switch/switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [
    SwitchComponent,
    NgxPaginationModule
  ],
  declarations: [
    PageTitleComponent,
    SwitchComponent
  ]
})
export class SharedModule { }
