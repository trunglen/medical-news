import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { QuillModule } from 'ngx-quill'
import { FormsModule } from '@angular/forms';


import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { CategoryService } from '../category/category.service';
import { PostService } from './post.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostRoutingModule,
    EditorModule,
    QuillModule,
    SharedModule
  ],
  declarations: [PostComponent],
  providers: [
    CategoryService,
    PostService
  ]
})
export class PostModule { }
