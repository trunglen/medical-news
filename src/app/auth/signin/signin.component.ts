import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

import 'rxjs/add/operator/do';
import { SessionFactory } from '../../../x/storage.utils';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onSignin(f: NgForm) {
    this.authService.login(f.value).subscribe(res => {
      SessionFactory.setItem('access_token', res);
      this.router.navigate(['/dashboard'], { relativeTo: this.activedRoute });
    });
  }
}
