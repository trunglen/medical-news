import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() { }

    public getToken() {
        return localStorage.getItem('token');
    }

    public setToken(token) {
        localStorage.setItem('token',token);
    }
    public authorize(token): boolean {
        return false;
    }
}