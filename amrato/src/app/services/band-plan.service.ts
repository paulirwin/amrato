// Data source: http://www.arrl.org/band-plan

import { Injectable } from '@angular/core';

export enum LicenseClass {
    AmateurExtra = "E",
    Advanced = "A",
    General = "G",
    Technician = "T",
    Novice = "N"
}

export enum BandSegmentType {
    RttyAndData = "rtty-data",
    PhoneAndImage = "phone-image",
    CwOnly = "cw-only",
    SsbPhone = "ssb-phone",
    UsbPhoneCwRttyAndData = "usb-cw-rtty-data",
    FixedDigitalMessageForwarding = "fixed-digital",
    AllModes = "all-modes",
}

const segmentTypeLegend: { [key: string]: string } = {
    [BandSegmentType.RttyAndData]: "RTTY and data",
    [BandSegmentType.PhoneAndImage]: "Phone and image",
    [BandSegmentType.CwOnly]: "CW only",
    [BandSegmentType.SsbPhone]: "SSB phone",
    [BandSegmentType.UsbPhoneCwRttyAndData]: "USB phone, CW, RTTY, and data",
    [BandSegmentType.FixedDigitalMessageForwarding]: "Fixed digital message forwarding systems only",
    [BandSegmentType.AllModes]: "All modes",
};

export enum DisplayMode {
    StackedBand = "stacked-band",
    ComplexBand = "complex-band",
    ChannelBand = "channel-band",
    ComplexStackedBand = "complex-stacked-band",
}

export interface Band {
    meters: number;
    displayName: string;
    displayMode: DisplayMode;
    note?: string;
    startFreqMhz: number;
    endFreqMhz: number;
    requiresUtcRegistration?: boolean;
    eirpMaxWatts?: number;
    eirpMaxWattsNote?: string;
    pepMaxWatts?: number;
    segments: BandSegment[];
}

export interface BandSegment {
    startMhz: number;
    endMhz: number;
    licenseClasses: LicenseClass[];
    type: BandSegmentType;
    eirpMaxWatts?: number;
    channelCenterFreqMhz?: number;
    note?: string;
}

const uhfNote = "Geographical and power restrictions may apply to all bands above 420MHz. See The ARRL Operating Manual for information about your area.";

const bands: Band[] = [
    {
        meters: 2200,
        displayName: "2,200 Meters (135 kHz)",
        displayMode: DisplayMode.StackedBand,
        startFreqMhz: 0.1357,
        endFreqMhz: 0.1378,
        requiresUtcRegistration: true,
        eirpMaxWatts: 1,
        segments: [
            {
                startMhz: 0.1357,
                endMhz: 0.1378,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 0.1357,
                endMhz: 0.1378,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.PhoneAndImage
            }
        ]
    },
    {
        meters: 630,
        displayName: "630 Meters (472 kHz)",
        displayMode: DisplayMode.StackedBand,
        startFreqMhz: 0.472,
        endFreqMhz: 0.479,
        requiresUtcRegistration: true,
        eirpMaxWatts: 5,
        eirpMaxWattsNote: "Except in Alaska within 496 miles of Russia where the power limit is 1 W EIRP.",
        segments: [
            {
                startMhz: 0.472,
                endMhz: 0.479,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 0.472,
                endMhz: 0.479,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.PhoneAndImage
            }
        ]
    },
    {
        meters: 160,
        displayName: "160 Meters (1.8 MHz)",
        displayMode: DisplayMode.StackedBand,
        note: "Avoid interference to radiolocation operations from 1.900 to 2.000 MHz",
        startFreqMhz: 1.8,
        endFreqMhz: 2.0,
        segments: [
            {
                startMhz: 1.8,
                endMhz: 2.0,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 1.8,
                endMhz: 2.0,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.PhoneAndImage
            }
        ]
    },
    {
        meters: 80,
        displayName: "80 Meters (3.5 MHz)",
        displayMode: DisplayMode.ComplexBand,
        startFreqMhz: 3.5,
        endFreqMhz: 4,
        segments: [
            {
                startMhz: 3.5,
                endMhz: 3.6,
                licenseClasses: [ LicenseClass.AmateurExtra ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 3.6,
                endMhz: 4,
                licenseClasses: [ LicenseClass.AmateurExtra ],
                type: BandSegmentType.PhoneAndImage
            },
            {
                startMhz: 3.525,
                endMhz: 3.6,
                licenseClasses: [ LicenseClass.Advanced ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 3.7,
                endMhz: 4,
                licenseClasses: [ LicenseClass.Advanced ],
                type: BandSegmentType.PhoneAndImage
            },
            {
                startMhz: 3.525,
                endMhz: 3.6,
                licenseClasses: [ LicenseClass.General ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 3.8,
                endMhz: 4,
                licenseClasses: [ LicenseClass.General ],
                type: BandSegmentType.PhoneAndImage
            },
            {
                startMhz: 3.525,
                endMhz: 3.6,
                licenseClasses: [ LicenseClass.Novice, LicenseClass.Technician ],
                type: BandSegmentType.CwOnly,
                eirpMaxWatts: 200
            },
        ]
    },
    {
        meters: 60,
        displayName: "60 Meters (5.3 MHz)",
        displayMode: DisplayMode.ChannelBand,
        note: "General, Advanced, and Amateur Extra licensees may operate on these five channels on a secondary basis with a maximum effective radiated power (ERP) of 100 W PEP relative to a half-wave dipole. Permitted operating modes include upper sideband voice (USB), CW, RTTY, PSK31 and other digital modes such as PACTOR III. Only one signal at a time is permitted on any channel.",
        startFreqMhz: 5.3305,
        endFreqMhz: 5.4065,
        segments: [
            {
                startMhz: 5.3305,
                endMhz: 5.3335,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.UsbPhoneCwRttyAndData,
                eirpMaxWatts: 100,
                channelCenterFreqMhz: 5.332
            },
            {
                startMhz: 5.3465,
                endMhz: 5.3495,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.UsbPhoneCwRttyAndData,
                eirpMaxWatts: 100,
                channelCenterFreqMhz: 5.348
            },
            {
                startMhz: 5.357,
                endMhz: 5.360,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.UsbPhoneCwRttyAndData,
                eirpMaxWatts: 100,
                channelCenterFreqMhz: 5.3585
            },
            {
                startMhz: 5.3715,
                endMhz: 5.3745,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.UsbPhoneCwRttyAndData,
                eirpMaxWatts: 100,
                channelCenterFreqMhz: 5.373
            },
            {
                startMhz: 5.4035,
                endMhz: 5.4065,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.UsbPhoneCwRttyAndData,
                eirpMaxWatts: 100,
                channelCenterFreqMhz: 5.405
            }
        ]
    },
    {
        meters: 40,
        displayName: "40 Meters (7 MHz)",
        displayMode: DisplayMode.ComplexBand,
        startFreqMhz: 7,
        endFreqMhz: 7.3,
        note: "See Sections 97.305(c), 97.307(f)(11) and 97.301(e). These exemptions do not apply to stations in the continental US.",
        segments: [
            {
                startMhz: 7.075,
                endMhz: 7.1,
                licenseClasses: [], // TODO: should this be specified?
                type: BandSegmentType.PhoneAndImage,
                note: "ITU 1, 3 and FCC region 2 west of 130° west or below 20° north"
            },
            {
                startMhz: 7,
                endMhz: 7.125,
                licenseClasses: [ LicenseClass.AmateurExtra ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 7.125,
                endMhz: 7.3,
                licenseClasses: [ LicenseClass.AmateurExtra ],
                type: BandSegmentType.PhoneAndImage
            },
            {
                startMhz: 7.025,
                endMhz: 7.125,
                licenseClasses: [ LicenseClass.Advanced ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 7.125,
                endMhz: 7.3,
                licenseClasses: [ LicenseClass.Advanced ],
                type: BandSegmentType.PhoneAndImage
            },
            {
                startMhz: 7.025,
                endMhz: 7.125,
                licenseClasses: [ LicenseClass.General ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 7.175,
                endMhz: 7.3,
                licenseClasses: [ LicenseClass.General ],
                type: BandSegmentType.PhoneAndImage
            },
            {
                startMhz: 7.025,
                endMhz: 7.125,
                licenseClasses: [ LicenseClass.Novice, LicenseClass.Technician ],
                type: BandSegmentType.CwOnly,
                eirpMaxWatts: 200
            },
            {
                startMhz: 7.025,
                endMhz: 7.075,
                licenseClasses: [ LicenseClass.Novice, LicenseClass.Technician ],
                type: BandSegmentType.CwOnly,
                note: "outside region 2"
            }
        ]
    },
    {
        meters: 30,
        displayName: "30 Meters (10.1 MHz)",
        displayMode: DisplayMode.StackedBand,
        startFreqMhz: 10.1,
        endFreqMhz: 10.15,
        note: "Avoid interference to fixed services outside the US.",
        pepMaxWatts: 200,
        segments: [
            {
                startMhz: 10.1,
                endMhz: 10.15,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General ],
                type: BandSegmentType.RttyAndData
            }
        ]
    },
    {
        meters: 20,
        displayName: "20 Meters (14 MHz)",
        displayMode: DisplayMode.ComplexBand,
        startFreqMhz: 14,
        endFreqMhz: 14.35,
        segments: [
            // TODO       
        ]
    },
    {
        meters: 17,
        displayName: "17 Meters (18 MHz)",
        displayMode: DisplayMode.ComplexBand,
        startFreqMhz: 18.068,
        endFreqMhz: 18.168,
        segments: [
            // TODO       
        ]
    },
    {
        meters: 15,
        displayName: "15 Meters (21 MHz)",
        displayMode: DisplayMode.ComplexBand,
        startFreqMhz: 21,
        endFreqMhz: 21.45,
        segments: [
            // TODO       
        ]
    },
    {
        meters: 12,
        displayName: "12 Meters (24 MHz)",
        displayMode: DisplayMode.ComplexBand,
        startFreqMhz: 24.890,
        endFreqMhz: 24.990,
        segments: [
            // TODO       
        ]
    },
    {
        meters: 10,
        displayName: "10 Meters (28 MHz)",
        displayMode: DisplayMode.ComplexBand,
        startFreqMhz: 28,
        endFreqMhz: 29.7,
        segments: [
            // TODO       
        ]
    },
    {
        meters: 6,
        displayName: "6 Meters (50 MHz)",
        displayMode: DisplayMode.StackedBand,
        startFreqMhz: 50,
        endFreqMhz: 54,
        segments: [
            {
                startMhz: 50,
                endMhz: 50.1,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.CwOnly
            },
            {
                startMhz: 50.1,
                endMhz: 54,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 50.1,
                endMhz: 54,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.PhoneAndImage
            }
        ]
    },
    {
        meters: 2,
        displayName: "2 Meters (144 MHz)",
        displayMode: DisplayMode.StackedBand,
        startFreqMhz: 144,
        endFreqMhz: 148,
        segments: [
            {
                startMhz: 144,
                endMhz: 144.1,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.CwOnly
            },
            {
                startMhz: 144.1,
                endMhz: 148,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 144.1,
                endMhz: 148,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.PhoneAndImage
            }
        ]
    },
    {
        meters: 1.25,
        displayName: "1.25 Meters (222 MHz)",
        displayMode: DisplayMode.ComplexStackedBand,
        startFreqMhz: 219,
        endFreqMhz: 225,
        segments: [
            // TODO       
        ]
    },
    {
        meters: 0.7,
        displayName: "70 cm (420 MHz)",
        displayMode: DisplayMode.StackedBand,
        note: uhfNote,
        startFreqMhz: 420,
        endFreqMhz: 450,
        segments: [
            {
                startMhz: 420,
                endMhz: 450,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 420,
                endMhz: 450,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.PhoneAndImage
            }
        ]
    },
    {
        meters: 0.33,
        displayName: "33 cm (902 MHz)",
        displayMode: DisplayMode.StackedBand,
        note: uhfNote,
        startFreqMhz: 902,
        endFreqMhz: 928,
        segments: [
            {
                startMhz: 902,
                endMhz: 928,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.RttyAndData
            },
            {
                startMhz: 902,
                endMhz: 928,
                licenseClasses: [ LicenseClass.AmateurExtra, LicenseClass.Advanced, LicenseClass.General, LicenseClass.Technician ],
                type: BandSegmentType.PhoneAndImage
            }   
        ]
    },
    {
        meters: 0.23,
        displayName: "23 cm (1240 MHz)",
        displayMode: DisplayMode.ComplexStackedBand,
        note: uhfNote,
        startFreqMhz: 1240,
        endFreqMhz: 1300,
        segments: [
            // TODO       
        ]
    },
];

@Injectable({
    providedIn: 'root'
})
export class BandPlanService {

    public bands = bands;
    public segmentTypeLegend = segmentTypeLegend;

    constructor() { }    
}
