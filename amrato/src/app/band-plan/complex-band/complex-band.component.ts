import { Component, OnInit, Input } from '@angular/core';

import { Band, LicenseClass, BandSegment, BandPlanService } from '../../services/band-plan.service';

interface ComplexBandRow {
    licenseClasses: LicenseClass[];
    segments: BandSegment[];
}

@Component({
    selector: 'app-complex-band',
    templateUrl: './complex-band.component.html',
    styleUrls: ['./complex-band.component.scss']
})
export class ComplexBandComponent implements OnInit {

    @Input() band: Band;

    rows: ComplexBandRow[] = [];

    constructor(public bandPlanService: BandPlanService) { }

    ngOnInit() {
        this.loadBandData();
    }

    loadBandData() {
        this.loadBandRow([LicenseClass.AmateurExtra]);
        this.loadBandRow([LicenseClass.Advanced]);
        this.loadBandRow([LicenseClass.General]);
        this.loadBandRow([LicenseClass.Novice, LicenseClass.Technician]);
    }

    loadBandRow(classes: LicenseClass[]) {
        const segments = this.band.segments.filter(i => i.licenseClasses.some(l => classes.includes(l)));

        if (!segments.length) {
            return;
        }

        const row: ComplexBandRow = {
            licenseClasses: classes,
            segments
        };

        this.rows.push(row);
    }
}
