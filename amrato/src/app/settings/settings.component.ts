import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public callsign: string;

    constructor(private settingsService: SettingsService) { 
        this.callsign = settingsService.callsign;
    }

    ngOnInit(): void {
    }

    saveSettings(e: Event) {
        this.settingsService.callsign = this.callsign;
    }

}
