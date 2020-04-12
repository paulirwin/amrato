import NetworkMessage from './NetworkMessage';
import { MessageType } from './MessageType';

export enum SpecialOperationMode {
    None = 0,
    NorthAmericaVHF = 1,
    EuropeanUnionVHF = 2,
    FieldDay = 3,
    RttyRoundup = 4,
    Fox = 5,
    Hound = 6,
}

export enum WsjtxStatusOperation {
    Receiving = "Receiving",
    Decoding = "Decoding",
    Transmitting = "Transmitting",
}

export default class StatusMessage extends NetworkMessage {

    public id: string;
    public dialFrequency: number;
    public mode: string;
    public dxCall: string;
    public report: string;
    public txMode: string;
    public txEnabled: boolean;
    public transmitting: boolean;
    public decoding: boolean;
    public rxFrequency: number;
    public txFrequency: number;
    public deCall: string;
    public deGrid: string;
    public dxGrid: string;
    public txWatchdog: boolean;
    public subMode: string;
    public fastMode: boolean;
    public specialOperationMode: SpecialOperationMode;
    public frequencyTolerance: number;
    public trPeriod: number;
    public configurationName: string;

    constructor(dataView: DataView) {
        super(dataView, MessageType.Status);

        const idstr = this.getString(0);
        this.id = idstr.value;

        // "number" type can safely hold every amateur frequency
        this.dialFrequency = Number(dataView.getBigUint64(idstr.end));

        const modestr = this.getString(idstr.end + 8);
        this.mode = modestr.value;

        const dxcallstr = this.getString(modestr.end);
        this.dxCall = dxcallstr.value;

        const reportstr = this.getString(dxcallstr.end);
        this.report = reportstr.value;

        const txmodestr = this.getString(reportstr.end);
        this.txMode = txmodestr.value;

        this.txEnabled = this.getBool(txmodestr.end);
        this.transmitting = this.getBool(txmodestr.end + 1);
        this.decoding = this.getBool(txmodestr.end + 2);
        this.rxFrequency = dataView.getUint32(txmodestr.end + 3);
        this.txFrequency = dataView.getUint32(txmodestr.end + 7);

        // const decallstr = this.getString(txmodestr.end + 11);
        // this.deCall = decallstr.value;

        // const degridstr = this.getString(decallstr.end);
        // this.deGrid = degridstr.value;

        // const dxgridstr = this.getString(degridstr.end);
        // this.dxGrid = dxgridstr.value;

        // this.txWatchdog = this.getBool(dxgridstr.end);

        // const submodestr = this.getString(dxgridstr.end + 1);
        // this.subMode = submodestr.value;

        // this.fastMode = this.getBool(submodestr.end);
        // this.specialOperationMode = dataView.getUint8(submodestr.end + 1);
        // this.frequencyTolerance = dataView.getUint32(submodestr.end + 2);
        // this.trPeriod = dataView.getUint32(submodestr.end + 6);
        
        // const confignamestr = this.getString(submodestr.end + 10);
        // this.configurationName = confignamestr.value;
    }

    get operation(): WsjtxStatusOperation {
        return this.transmitting 
            ? WsjtxStatusOperation.Transmitting
            : this.decoding
            ? WsjtxStatusOperation.Decoding
            : WsjtxStatusOperation.Receiving;
    }

    toString(): string {
        return `Status: ${this.operation} ${this.mode} ${this.dialFrequency}`;
    }
}