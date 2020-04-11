import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { BandPlanComponent } from './band-plan/band-plan.component';
import { WsjtxComponent } from './wsjtx/wsjtx.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "map", component: MapComponent },
    { path: "band-plan", component: BandPlanComponent },
    { path: "wsjtx", component: WsjtxComponent },
    { path: "settings", component: SettingsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
