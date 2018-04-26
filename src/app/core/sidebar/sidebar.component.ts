import { Component, OnInit } from '@angular/core';
import { menus } from './menu';
import { HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { SessionFactory } from '../../../x/storage.utils';

@Component({
  selector: 'medical-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menus = menus;
  userName = SessionFactory.getItem('access_token').user_info.name
  role = ''
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const token = SessionFactory.getItem('access_token')
    this.role = token ? token.user_info.role : ''
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/auth/signin']);
  }

}
