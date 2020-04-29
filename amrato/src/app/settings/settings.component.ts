import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { LinkService } from '../services/link.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public callsign: string;
    public gridCode: string;
    public enableQrzXml: boolean;
    public qrzUsername: string;
    public qrzPassword: string;

    public dirty: boolean;

    constructor(private settingsService: SettingsService, private linkService: LinkService) { 
        this.callsign = settingsService.callsign;
        this.gridCode = settingsService.gridCode;
        this.enableQrzXml = settingsService.enableQrzXml;
        this.qrzUsername = settingsService.qrzUsername;
        this.qrzPassword = settingsService.qrzPassword;
    }

    ngOnInit(): void {
    }

    onModelChange() {
        this.dirty = true;
    }

    saveSettings(e: Event) {
        this.settingsService.callsign = this.callsign;
        this.settingsService.gridCode = this.gridCode;
        this.settingsService.enableQrzXml = this.enableQrzXml;
        this.settingsService.qrzUsername = this.qrzUsername;
        this.settingsService.qrzPassword = this.qrzPassword;
        
        this.dirty = false;
    }

    openUrlInBrowser(e: Event) {
        e.preventDefault();
        this.linkService.openLinkInBrowser((e.target as HTMLAnchorElement).href);
        return false;
    }
}
