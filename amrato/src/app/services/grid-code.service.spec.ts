import { TestBed } from '@angular/core/testing';

import { GridCodeService } from './grid-code.service';

describe('GridCodeService', () => {
    let service: GridCodeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GridCodeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("#convertGridCodeToCoordinates examples", () => {
        const munich = service.convertGridCodeToCoordinates("JN58TD");

        expect(munich).toBeDefined();
        expect(munich.longitude.toString()).toEqual("11° 36.5' E");
        expect(munich.latitude.toString()).toEqual("48° 8.8' N");
    });
});
