import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionFactory } from '../../x/storage.utils';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (!sessionStorage.getItem('access_token')) {
            this.router.navigate(["/auth/signin"]);
            return false;
        }
        return true;
    }
}

@Injectable()
export class SuperAdminGuardService implements CanActivate {
    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (SessionFactory.getItem('access_token') && SessionFactory.getItem('access_token')['user_info'].role === 'admin') {
            return false;
        }
        return true;
    }
}