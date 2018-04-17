import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { PostService } from './post.service';
import { CategoryService } from '../category/category.service';

const routes: Routes = [
  {
    path: '', component: PostComponent, resolve: {
      post: PostService,
      category: CategoryService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }
