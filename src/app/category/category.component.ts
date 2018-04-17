import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../shared/model/category.model';
import { CategoryService, Category } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  p: number = 1;
  categories: Observable<ICategory[]>;
  showNew: Boolean = true
  categoryName: string
  categoryId: string

  constructor(
    public categoryService: CategoryService,
  ) { }

  ngOnInit() {
  }

  onCreate() {
    this.categoryService.createCategory({ id: '', name: this.categoryName });
  }

  onCancel() {
    this.categoryName = ''
    this.categoryId = ''
    this.showNew = true
  }
  onUpdate() {
    this.categoryService.updateCategory({ id: this.categoryId, name: this.categoryName })
  }

  onSelect(category: Category) {
    this.categoryName = category.name
    this.categoryId = category.id
    this.showNew = false
  }

  onDelete(c: Category) {
    this.categoryService.deleteCategory(c);
  }

}
