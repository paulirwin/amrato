import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    needsSetup = false;

    constructor(private settingsService: SettingsService) { }

    ngOnInit(): void {
        if (!this.settingsService.callsign) {
            this.needsSetup = true;
        }
    }

}
