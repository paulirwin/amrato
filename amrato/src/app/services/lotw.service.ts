import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as Papa from "papaparse";

import { DatabaseService } from './database.service';
import LotwUserActivity from '../models/LotwUserActivity';

@Injectable({
    providedIn: 'root'
})
export class LotwService {

    private initialized: boolean = false;

    constructor(private http: HttpClient, private db: DatabaseService) { }

    async initialize() {
        const lastSync = this.lastUserActivitySync;

        if (!lastSync || moment.utc(lastSync).toDate() < moment.utc().subtract(7, "days").toDate()) {
            await this.loadUserActivity();
        }

        this.initialized = true;
    }

    async getUserLastActivity(callsign: string): Promise<Date | null> {

        if (!callsign || !this.initialized) {
            return null;
        }

        const cacheKey = `LOTWCache_${callsign}`;
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
            return cached === "null" ? null : new Date(cached);
        }

        const dbRecord = await this.db.lotwUserActivity.where("callsign").equals(callsign).first();

        if (!dbRecord) {
            sessionStorage.setItem(cacheKey, "null");
            return null;
        }

        sessionStorage.setItem(cacheKey, dbRecord.dt.toISOString());
        return dbRecord.dt;
    }

    loadUserActivity(): Promise<void> {    
        return new Promise<void>((resolve, reject) => {
            console.debug("Loading LOTW user activity data...");

            const dbRecords: LotwUserActivity[] = [];

            Papa.parse("https://lotw.arrl.org/lotw-user-activity.csv", {
                download: true,
                step: record => {
                    const date = record.data[1];
                    const time = record.data[2];

                    dbRecords.push({
                        callsign: record.data[0],
                        dt: new Date(`${date}T${time}Z`)
                    });
                },
                complete: () => {
                    console.debug(`Parsed ${dbRecords.length} LOTW user activity records. Saving to db...`);

                    this.db.lotwUserActivity.bulkPut(dbRecords).then(() => {
                        console.debug("Saved LOTW user activity data to db");
                        this.lastUserActivitySync = new Date();
                        resolve();
                    });                    
                },
                error: () => {
                    reject();
                }
            });
        });
    }

    get lastUserActivitySync(): Date | null {
        const value = localStorage.getItem("lotwUserActivity_lastSync");

        return value ? new Date(value) : null;
    }

    set lastUserActivitySync(value: Date) {
        localStorage.setItem("lotwUserActivity_lastSync", value.toISOString());
    }
}
