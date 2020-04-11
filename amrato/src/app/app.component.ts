import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

import { version } from "../../package.json";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = `Amrato v${version}`;
    version = version;
    datetime: string;

    ngOnInit() {        
        setInterval(this.updateDateTime.bind(this), 1000);
    }

    updateDateTime() {
        this.datetime = moment.utc().format("YYYY-MM-DD HH:mm UTC");
    }
}
