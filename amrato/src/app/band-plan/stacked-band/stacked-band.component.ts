import { Component, OnInit, Input } from '@angular/core';

import { Band, BandPlanService, BandSegmentType, BandSegment } from '../../services/band-plan.service';

@Component({
    selector: 'app-stacked-band',
    templateUrl: './stacked-band.component.html',
    styleUrls: ['./stacked-band.component.scss']
})
export class StackedBandComponent implements OnInit {

    @Input() band: Band;

    constructor(public bandPlanService: BandPlanService) { }

    ngOnInit(): void {
    }

    get licenseClassString(): string {
        if (!this.band.segments || this.band.segments.length === 0) {
            return "";
        }

        return this.band.segments[0].licenseClasses.join(",");
    }

    get startFreqString(): string {
        if (this.band.startFreqMhz < 1) {
            return `${this.band.startFreqMhz * 1000} kHz`;
        } else if (this.band.startFreqMhz < 50) {
            return `${this.band.startFreqMhz.toFixed(3)} MHz`;
        } else if (this.band.startFreqMhz < 1000) {
            return `${this.band.startFreqMhz.toFixed(1)} MHz`;
        } else {
            return `${this.band.startFreqMhz.toFixed(0)} MHz`;
        }
    }

    get endFreqString(): string {
        if (this.band.endFreqMhz < 1) {
            return `${this.band.endFreqMhz * 1000} kHz`;
        } else if (this.band.endFreqMhz < 50) {
            return `${this.band.endFreqMhz.toFixed(3)} MHz`;
        } else if (this.band.endFreqMhz < 1000) {
            return `${this.band.endFreqMhz.toFixed(1)} MHz`;
        } else {
            return `${this.band.endFreqMhz.toFixed(0)} MHz`;
        }
    }

    get eirpMaxWattsString(): string {
        if (!this.band.eirpMaxWatts) {
            return "";
        }

        let str = `${this.band.eirpMaxWatts} W EIRP maximum`;

        if (this.band.eirpMaxWattsNote) {
            str += " *";
        }

        return str;
    }

    get hasCwOnlySection(): boolean {
        return this.band.segments.some(i => i.type === BandSegmentType.CwOnly);
    }

    get cwEndFreqString(): string {
        const mhz = this.band.segments.find(i => i.type === BandSegmentType.CwOnly).endMhz;

        return mhz.toFixed(1);
    }

    get segmentStackedRows(): BandSegment[] {
        return this.band.segments.filter(i => i.type !== BandSegmentType.CwOnly);
    }
}
