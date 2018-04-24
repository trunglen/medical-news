import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../../x/http/http.service';
import { apiURL } from '../common/api.common';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import { ToastNotificationService } from '../../x/http/toast-notification.service';

const initialData: Category[] = [];

@Injectable()
export class CategoryService implements Resolve<Boolean>{

  private model: Model<Category[]>;

  categories$: Observable<Category[]>;

  constructor(
    private modelFactory: ModelFactory<Category[]>,
    private httpService: HttpService,
    private toastService: ToastNotificationService

  ) {
    this.model = this.modelFactory.create(initialData);
    this.categories$ = this.model.data$;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Boolean> {
    return this.httpService.Get(apiURL.getCategories).do(data => this.model.set(data ? data : [])).mapTo(true);
  }

  createCategory(cat: Category) {
    this.httpService.Post(apiURL.createCategory, cat).subscribe(res => {
      var categories = this.model.get();
      categories.push(res);
      this.model.set(categories);
      this.toastService.success('Taọ mới danh mục thành công');
    });
  }

  updateCategory(cat: Category) {
    this.httpService.Post(apiURL.updateCategory, cat).subscribe(res => {
      var categories = this.model.get();
      categories.find(c => c.id === cat.id).name = cat.name
      this.model.set(categories);
      this.toastService.success('Cập nhật danh mục thành công');
    });
  }

  deleteCategory(c: Category) {
    this.httpService.Get(apiURL.deleteCategory, { id: c.id }).subscribe(res => {
      var categories = this.model.get();
      categories.splice(categories.indexOf(c), 1);
      this.model.set(categories);
      this.toastService.success('Xóa danh mục thành công');
    });

  }
}
export class Category {
  constructor(
    public id: string = '',
    public name: string = ''
  ) { }
}
