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

    get gridCode(): string {
        return localStorage.getItem("gridCode");
    }

    set gridCode(value: string) {
        localStorage.setItem("gridCode", value);
    }

    get enableQrzXml(): boolean {
        return localStorage.getItem("enableQrzXml") === "true";
    }

    set enableQrzXml(value: boolean) {
        localStorage.setItem("enableQrzXml", value.toString());
    }

    get qrzUsername(): string {
        return localStorage.getItem("qrzUsername");
    }

    set qrzUsername(value: string) {
        localStorage.setItem("qrzUsername", value);
    }

    get qrzPassword(): string {
        return localStorage.getItem("qrzPassword");
    }

    set qrzPassword(value: string) {
        localStorage.setItem("qrzPassword", value);
    }
}
