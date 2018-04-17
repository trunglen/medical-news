import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../x/http/http.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { apiURL } from '../common/api.common';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';

export class User {
  constructor(
    public id: string = '',
    public name: string = '',
    public uname: string = '',
    public password: string = '',
    public post_count: number,
  ) { }
}

const initialData: User[] = [];

@Injectable()
export class UserService implements Resolve<boolean>{

  private model: Model<User[]>;

  users$: Observable<User[]>;

  constructor(
    private modelFactory: ModelFactory<User[]>,
    private httpService: HttpService
  ) {
    this.model = this.modelFactory.create(initialData);
    this.users$ = this.model.data$;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.httpService.Get(apiURL.getUsers).do(data => this.model.set(data === null ? [] : data)).mapTo(true);
  }

  addUser(user: User) {
    this.httpService.Post(apiURL.createUser, user).subscribe(res => {
      var users = this.model.get();
      users.push(res);
      this.model.set(users);
    }, err => console.log(err))
  }

  updateUser(user: User, index: number) {
    const users = this.model.get();
  }

  deleteUser(id: string, index: number) {
    this.httpService.Get(apiURL.deleteUser, { id: id }).subscribe(res => {
      var users = this.model.get();
      users.splice(index, 1);
      this.model.set(users);
    }, err => console.log(err))
  }

}

