import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../../x/http/http.service';
import { apiURL } from '../common/api.common';
import { ToastNotificationService } from '../../x/http/toast-notification.service';
import { SessionFactory } from '../../x/storage.utils';
import { PostComponent } from './post.component';

const initialData: Post[] = [];

@Injectable()
export class PostService implements Resolve<Boolean> {

  private model: Model<Post[]>;

  posts$: Observable<Post[]>;

  constructor(
    private modelFactory: ModelFactory<Post[]>,
    private httpService: HttpService,
    private toastService: ToastNotificationService
  ) {
    this.model = this.modelFactory.create(initialData);
    this.posts$ = this.model.data$;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Boolean | Observable<Boolean> | Promise<Boolean> {

    const userInfo = SessionFactory.getItem('access_token').user_info;
    var userID = userInfo.role === 'super-admin' ? '' : userInfo.id;
    var param = <any>{}
    param.user_id = userID
    if (route.queryParamMap.get("status")) {
      param.approve = route.queryParamMap.get("status")
    }
    return this.httpService.Get(apiURL.getPosts, param).do(res => this.model.set(res ? res : [])).mapTo(true);
  }

  createPost(post: Post, thumbFile: HTMLInputElement, component: PostComponent) {
    this.httpService.Post(apiURL.createPost, post).subscribe(res => {
      //upload anh
      var formData = new FormData()
      formData.set('thumb', thumbFile.files[0])
      this.uploadThumb(formData, res.id).subscribe()
      var posts = this.model.get()
      posts.unshift(res)
      this.model.set(posts)
      this.toastService.success('Tạo bài viết thành công')
      this.httpService.Get(apiURL.getPosts, {}).do(res => this.model.set(res ? res : [])).subscribe()      
      component.refreshForm()
    })
  }

  updatePost(newPost: Post, thumbFile: HTMLInputElement, index: number) {
    return this.httpService.Post(apiURL.updatePost, newPost).subscribe(res => {
      var posts = this.model.get();
      posts.splice(index, 1, res);
      this.model.set(posts);
      var formData = new FormData();
      if (thumbFile.files[0]) {
        formData.set('thumb', thumbFile.files[0])
        this.uploadThumb(formData, res.id).subscribe(res => {
        });
      }
      this.toastService.success('Cập nhật bài viết thành công')
    });

  }

  approvePost(post: Post, index: number) {
    var posts = this.model.get();
    posts[index].approve = !posts[index].approve
    this.model.set(posts);
    this.toastService.success('Duyệt bài viết thành công');
  }

  deletePost(p: Post) {
    return this.httpService.Get(apiURL.deletePost, { id: p.id }).subscribe(res => {
      var posts = this.model.get();
      posts.splice(posts.indexOf(posts.find(post => post.id === p.id)), 1);
      this.model.set(posts);
      // this.toastService.success('Xóa bài viết thành công');
    });
  }

  approve(p: Post) {
    var posts = this.model.get()
    // posts[posts.indexOf(posts.find(p => p.id === p.id))].approve = !p.approve
    console.log(posts.indexOf(posts.find(post => post.id === p.id)))
    console.log(posts)
    return this.httpService.Get(apiURL.approvePost, { id: p.id }).subscribe(res => {
      var posts = this.model.get()
      posts.find(post => post.id === p.id).approve = !p.approve
      this.model.set(posts)
    });
  }

  uploadThumb(formData: FormData, postID: string) {
    return this.httpService.Post(`${apiURL.uploadThumb}?post_id=${postID}`, formData);
  }

  notify(p: Post) {
    return this.httpService.Post(`${apiURL.notifyPost}`, p);
  }

}

export class Post {
  constructor(
    public id: string = '',
    public title: string = '',
    public content: string = '',
    public category: string = '',
    public thumb: string = '',
    public description: string = '',
    public approve: boolean,
    public noti_sending: boolean,
    public author: string
  ) { }
}
