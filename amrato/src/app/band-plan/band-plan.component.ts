import { Component, OnInit } from '@angular/core';

import { LinkService } from '../services/link.service';
import { Band, BandPlanService } from '../services/band-plan.service';

@Component({
    selector: 'app-band-plan',
    templateUrl: './band-plan.component.html',
    styleUrls: ['./band-plan.component.scss']
})
export class BandPlanComponent implements OnInit {

    bands: Band[];

    constructor(private linkService: LinkService, bandPlanService: BandPlanService) {
        this.bands = bandPlanService.bands;
    }

    ngOnInit(): void {
    }

    openUrlInBrowser(e: Event) {
        e.preventDefault();
        this.linkService.openLinkInBrowser((e.target as HTMLAnchorElement).href);
        return false;
    }

}
