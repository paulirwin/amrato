import { Injectable } from '@angular/core';
import Maidenhead from "maidenhead";

export class DegreesMinutes {
    constructor(public degrees: number, public minutes: number, private isLongitude: boolean) {
    }

    toString(): string {
        return `${Math.abs(this.degrees).toFixed(0)}° ${this.minutes.toFixed(1)}' ${this.isLongitude ? (this.degrees < 0 ? "W" : "E") : (this.degrees < 0 ? "S" : "N")}`
    }

    toDecimal(): number {
        return this.degrees + (this.minutes / 60);
    }

    static fromDecimal(decimal: number, isLongitude: boolean): DegreesMinutes {
        const deg = Math.trunc(decimal);
        const min = Math.abs((decimal - deg) * 60);
        
        return new DegreesMinutes(deg, min, isLongitude);
    }
}

export class Coordinates {
    constructor(public longitude: DegreesMinutes, public latitude: DegreesMinutes) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class GridCodeService {
    constructor() { }

    convertGridCodeToCoordinates(gridCode: string): Coordinates | null {
        const [ lat, lon ] = Maidenhead.toLatLon(gridCode);
        
        return new Coordinates(DegreesMinutes.fromDecimal(lon, true), DegreesMinutes.fromDecimal(lat, false));
    }
}
