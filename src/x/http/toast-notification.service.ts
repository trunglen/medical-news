import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToastNotificationService {

    constructor(
        private snotifyService: SnotifyService
    ) { }

    confirm(title: string) {
        return new Observable(observer => {
            const id = this.snotifyService.confirm(title, null, {
                buttons: [
                    { text: 'Yes', action: () => { observer.next(); this.snotifyService.remove(id) }, bold: false },
                    { text: 'Cancel', action: (toast) => { console.log(''); this.snotifyService.remove(toast.id) }, bold: false },
                ]
            }).id;
        })
    }

    error(message: string) {
        this.snotifyService.error(message);
    }

    success(message: string) {
        this.snotifyService.success(message);
    }
}