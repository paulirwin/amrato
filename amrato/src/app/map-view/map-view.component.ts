import { Component, OnInit } from '@angular/core';

//import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

    map: Map;

    constructor() { }

    ngOnInit(): void {
        this.map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
    }

    setCenter(longitude: number, latitude: number) {
        console.log(`Setting center to ${longitude},${latitude}`);
        const view = this.map.getView();
        view.setCenter(fromLonLat([longitude, latitude]));
        view.setZoom(10);
    }
}
