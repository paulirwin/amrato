import { Band } from '../services/band-plan.service';

export function frequencyHzToDisplayString(freq: number): string {
    if (freq < 1_000_000) {
        return `${(freq / 1_000)} kHz`;
    } else if (freq < 1_000_000_000) {
        return `${(freq / 1_000_000)} MHz`;
    } else {
        return `${(freq / 1_000_000_000)} GHz`;
    }
}

export function frequencyHzToBandString(bands: Band[], freq: number): string | null {
    const mhz = freq / 1_000_000;
    
    for (const band of bands) {
        if (mhz >= band.startFreqMhz && mhz <= band.endFreqMhz) {
            if (band.meters < 1) {
                return `${band.meters * 100}cm`;
            } else {
                return `${band.meters}m`;
            }
        }
    }

    return null;
}