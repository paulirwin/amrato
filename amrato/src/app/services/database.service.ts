import { Injectable } from '@angular/core';
import Dexie from "dexie";
import LotwUserActivity from '../models/LotwUserActivity';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private db: Dexie;

    constructor() { 
        this.db = new Dexie("amrato");
        this.db.version(1).stores({
            lotwUserActivity: "callsign,dt"
        });
    }

    get lotwUserActivity(): Dexie.Table<LotwUserActivity, string> {
        return this.db.table("lotwUserActivity");
    }
}
