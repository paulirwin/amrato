import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
    providedIn: 'root'
})
export class LinkService {

    constructor(private electronService: ElectronService) { }

    openLinkInBrowser(url: string) {
        const isElectron: boolean = /electron\//gi.test(window.navigator.userAgent);

        if (isElectron && confirm(`Are you sure you want to open this external link? ${url}`)) {
            this.electronService.shell.openExternal(url);
        } else {
            window.open(url, "_blank");
        }
    }
}
