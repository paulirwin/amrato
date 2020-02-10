import { Component, OnInit } from '@angular/core';
import { GridCodeService } from '../services/grid-code.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    gridCode: string = "";

    constructor(private gridCodeService: GridCodeService) { }

    ngOnInit(): void {
    }

    onGridSubmit(e: Event): void {
        e.preventDefault();
        
        const coords = this.gridCodeService.convertGridCodeToCoordinates(this.gridCode);

        alert(coords.longitude.toString() + " " + coords.latitude.toString());
    }    
}
