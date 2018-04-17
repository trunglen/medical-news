import { Injectable } from '@angular/core';
import { HttpService } from '../../x/http/http.service';
import { apiURL } from '../common/api.common';

@Injectable()
export class AuthService {

    constructor(
        private httpService: HttpService
    ) { }

    login(userInfo: { uname: string, password: string }) {
        return this.httpService.Post(apiURL.login, userInfo)
    }
}