import * as moment from "moment";

import NetworkMessage from './NetworkMessage';
import { MessageType } from './MessageType';

export default class DecodeMessage extends NetworkMessage {

    public id: string;
    public new: boolean;
    public time: Date;
    public snr: number;
    public deltaTime: number;
    public deltaFrequency: number;
    public mode: string;
    public message: string;
    public lowConfidence: boolean;
    public offAir: boolean;

    constructor(dataView: DataView) {
        super(dataView, MessageType.Decode);

        const idstr = this.getString(0);
        this.id = idstr.value;

        this.new = this.getBool(idstr.end);

        this.time = this.getDateFromQTime(idstr.end + 1);

        this.snr = this.dataView.getInt32(idstr.end + 5);

        this.deltaTime = this.dataView.getFloat64(idstr.end + 9);

        this.deltaFrequency = this.dataView.getUint32(idstr.end + 17);

        const modestr = this.getString(idstr.end + 21);
        this.mode = modestr.value;

        const messagestr = this.getString(modestr.end);
        this.message = messagestr.value;

        this.lowConfidence = this.getBool(messagestr.end);

        this.offAir = this.getBool(messagestr.end + 1);
    }

    get timeString() {
        return moment.utc(this.time).format("HH:mm:ss");
    }

    get isCQ() {
        return this.message.startsWith("CQ ");
    }

    toString() {
        return `Decode: id ${this.id} ${this.new ? 'new' : 'not-new'} ${this.timeString} ${this.snr.toFixed(0)}dB ${this.mode} ${this.message}`;
    }
}