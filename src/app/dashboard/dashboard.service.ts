import { Injectable } from '@angular/core';
import { HttpService } from '../../x/http/http.service';
import { apiURL } from '../common/api.common';
import { Report } from './report.model';

@Injectable()
export class DashboardService {

    constructor(
        private http:HttpService
    ) { }

     getReport() {
        return this.http.Get<Report>(apiURL.getGeneralReport)
    }
}