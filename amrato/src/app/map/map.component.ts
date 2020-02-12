import { Component, OnInit, ViewChild } from '@angular/core';
import { GridCodeService } from '../services/grid-code.service';
import { MapViewComponent } from '../map-view/map-view.component';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    gridCode: string = "";
    @ViewChild("mapView") mapView: MapViewComponent;

    constructor(private gridCodeService: GridCodeService) { }

    ngOnInit(): void {
    }

    onGridSubmit(e: Event): void {
        e.preventDefault();
        
        const coords = this.gridCodeService.convertGridCodeToCoordinates(this.gridCode);

        this.mapView.setCenter(coords.longitude.toDecimal(), coords.latitude.toDecimal());
    }    
}
