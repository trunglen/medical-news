import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  p: number = 1;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  onCreate(f: NgForm) {
    var value = f.value;
    value.role = 'admin';
    this.userService.addUser(f.value);
  }

  onDelete(id: string, i: number) {
    this.userService.deleteUser(id, i);

  }
}
