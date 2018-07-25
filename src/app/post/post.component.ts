import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../core/spinner/spinner.service';
import { NgForm } from '@angular/forms';

import { CategoryService } from '../category/category.service';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../shared/model/category.model';
import { PostService, Post } from './post.service';
import { environment } from '../../environments/environment';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { SnotifyService } from 'ng-snotify';
import { ToastNotificationService } from '../../x/http/toast-notification.service';
import { SessionFactory } from '../../x/storage.utils';

const imageHolder = 'assets/images/image-holder-icon-614x460.png'
@Component({
  selector: 'admin-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  postModel: Post
  showNew: Boolean = true
  selectedRow: number
  selectedThumb: string = imageHolder
  editorConfig = TinyMCEConfig
  p: number = 1

  @ViewChild('f') form: NgForm;
  @ViewChild('fileThumb') fileThumb: HTMLImageElement;
  constructor(
    public categoryService: CategoryService,
    public postService: PostService,
    private snotifyService: SnotifyService,
    private toastNotificationService: ToastNotificationService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.refreshForm()
    this.activedRoute.queryParams.subscribe(res => console.log('query param ', res))
    console.log(this.activedRoute.queryParamMap)
  }

  ngOnDestroy(): void {

  }

  onSelect(i: number, post: Post) {
    this.showNew = false;
    this.form.setValue({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      description: post.description,
    });
    this.selectedThumb = `${environment.staticURL}post/${post.id}`
    this.fileThumb.src = `${environment.staticURL}post/${post.id}`
  }

  onCreate(f: NgForm, thumbFile: HTMLInputElement) {
    const value = f.value;
    value.author = SessionFactory.getItem('access_token').user_info.id;
    value.content = `<h3>${value.title}</h3><p>${value.description}</p>${value.content}`
    this.postService.createPost(value, thumbFile, this)
  }

  onUpdate(f: NgForm, thumbFile: HTMLInputElement) {
    this.postService.updatePost(f.value, thumbFile, this.selectedRow);
  }

  onNew() {
    this.postModel = <Post>{};
    // this.submitType = 'Thêm mới';
    this.showNew = true;
  }

  onEdit(index: number) {

  }

  onDelete(p: Post) {
    this.toastNotificationService.confirm('Bạn có chắc muốn xóa').subscribe(res => {
      this.postService.deletePost(p);
    });
  }

  onCancel() {
    this.showNew = true;
    this.refreshForm();
  }

  onSave() {

  }

  approve(p: Post) {
    if (!p.approve) {
      this.toastNotificationService.confirm('Bạn có muốn gửi thông báo đến mọi người').subscribe(res => {
        this.postService.notify(p).subscribe(res => {
          console.log(res)
        })
      })
    }
    this.postService.approve(p)
  }

  disabled() {
    return SessionFactory.getItem('access_token').user_info.role === 'admin';
  }

  previewFile() {
    var preview = <HTMLImageElement>document.querySelector('.load-image');
    var file = (<HTMLInputElement>document.querySelector('input[type=file]')).files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  refreshForm() {
    this.selectedThumb = imageHolder
    this.form.setValue({
      id: '',
      title: '',
      content: '',
      category: '',
      description: '',
    })
  }
}


const TinyMCEConfig = {
  selector: 'textarea',  // change this value according to your HTML
  plugins: 'image code fullscreen',
  relative_urls: true,
  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
  // toolbar: "sizeselect | bold italic | fontselect |  fontsizeselect",
  images_upload_handler: function (blobInfo, success, failure) {
    var xhr, formData;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', `${environment.baseURL}admin/post/upload/post-image`);
    xhr.onload = function () {
      var json;
      if (xhr.status != 200) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }
      json = JSON.parse(xhr.responseText);
      console.log(json);
      if (!json || typeof json.location != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }
      success(json.location);
    };
    formData = new FormData();
    formData.append('post-image', blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
  }
}