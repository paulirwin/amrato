import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public callsign: string;
    public gridCode: string;

    constructor(private settingsService: SettingsService) { 
        this.callsign = settingsService.callsign;
        this.gridCode = settingsService.gridCode;
    }

    ngOnInit(): void {
    }

    saveSettings(e: Event) {
        this.settingsService.callsign = this.callsign;
        this.settingsService.gridCode = this.gridCode;
    }

}
