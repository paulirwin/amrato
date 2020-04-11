import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor() { }

    get callsign(): string {
        return localStorage.getItem("callsign");
    }

    set callsign(value: string) {
        localStorage.setItem("callsign", value);
    }
}
