import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { SettingsService } from './settings.service';
import { version } from "../../../package.json";

export class XmlDataError {
    constructor(public error: string, public message?: string) {}
}

export interface XmlCallsignLookupResult {
    call: string;
    // aliases: string[];
    // dxcc: string;
    // fname: string;
    // name: string;
    // addr1: string;
    // addr2: string;
    state: string;
    // zip: string;
    country: string;
    // ccode: string;
    // lat: number;
    // lon: number;
    // grid: string;
    // county: string;
    // fips: string;
    land: string;
    // efdate: string;
    // expdate: string;
    // p_call: string;
    // class: string;
    // codes: string;
    // qslmgr: string;
    // email: string;
    // url: string;
    // u_views: number;
    // bio: string;
    // biodate: string;
    // image: string;
    // imageinfo: string;
    // serial: number;
    // moddate: string;
    // MSA: string;
    // AreaCode: string;
    // TimeZone: string;
    // GMTOffset: string;
    // DST: string;
    // eqsl: string;
    // mqsl: string;
    // cqzone: number;
    // ituzone: number;
    // geoloc: string;
    // born: number;
    // user: string;
    // lotw: boolean;
    // iota: string;
}

interface CachedCallsignData {
    updated: string;
    data: XmlCallsignLookupResult;
}

const API_VERSION = "1.33";
const HTTPS_URL = `https://xmldata.qrz.com/xml/${API_VERSION}/`;
const HTTP_URL = `http://xmldata.qrz.com/xml/${API_VERSION}/`;

@Injectable({
    providedIn: 'root'
})
export class QrzXmlService {

    constructor(private http: HttpClient, private settingsService: SettingsService) { }

    public async callsignLookup(callsign: string, retrying: boolean = false): Promise<XmlCallsignLookupResult> {

        const cacheKey = `qrzxml_callsign_${callsign}`;

        let cachedJson = localStorage.getItem(cacheKey);

        if (cachedJson) {
            const cachedData = JSON.parse(cachedJson) as CachedCallsignData;

            if (cachedData.updated && moment.utc(cachedData.updated).toDate() > moment.utc().subtract(7, "days").toDate()) {
                return cachedData.data;
            }
        }

        if (!this.sessionKey) {
            await this.login();
        }

        const xml = await this.http.get(HTTP_URL, {
            params: {
                s: this.sessionKey,
                callsign
            },
            responseType: "text"
        }).toPromise();

        const doc = this.parseXml(xml);

        try {
            this.checkForError(doc); 
        } catch (e) {
            if (e.error.toLowerCase() === "session timeout" && !retrying) {
                this.sessionKey = null;
                return await this.callsignLookup(callsign, true);                
            }

            throw e;
        }        

        console.debug(`Loading callsign data from QRZ.com XML data for ${callsign}...`);

        const el = doc.documentElement.querySelector("Callsign");

        const result: XmlCallsignLookupResult = {
            call: this.getText(el, "call"),
            country: this.getText(el, "country"),
            land: this.getText(el, "land"),
            state: this.getText(el, "state"),
        };

        cachedJson = JSON.stringify(<CachedCallsignData>{ 
            updated: moment.utc().toDate().toISOString(),
            data: result
        });

        localStorage.setItem(cacheKey, cachedJson);

        console.debug(`Successfully loaded callsign data from QRZ.com XML data for ${callsign}`);

        return result;
    }

    private getText(el: Element, child: string): string {
        return el.querySelector(child)?.textContent;
    }

    private get sessionKey(): string {
        return sessionStorage.getItem("qrzxml_sessionkey");
    }

    private set sessionKey(value: string) {
        sessionStorage.setItem("qrzxml_sessionkey", value);
    }

    public async login(): Promise<void> {
        if (this.sessionKey) {
            return;
        }

        console.debug("Logging into QRZ.com XML data...");

        const xml = await this.http.get(HTTPS_URL, {
            params: {
                username: this.settingsService.qrzUsername,
                password: this.settingsService.qrzPassword,
                agent: `Amrato v${version}`,
            },
            responseType: "text"
        }).toPromise();

        const doc = this.parseXml(xml);

        this.checkForError(doc);

        const key = doc.documentElement.querySelector("Session > Key").textContent;

        this.sessionKey = key;

        console.debug("Successfully logged into QRZ.com XML data");
    }

    private checkForError(doc: Document) {
        const errorNode = doc.documentElement.querySelector("Session > Error");

        if (!errorNode) {
            return;
        }

        const error = errorNode.textContent;
        const message = doc.documentElement.querySelector("Session > Message")?.textContent;

        throw new XmlDataError(error, message);
    }

    private parseXml(raw: string) {
        var dom = new DOMParser();
        return dom.parseFromString(raw, "application/xml");
    }
}
