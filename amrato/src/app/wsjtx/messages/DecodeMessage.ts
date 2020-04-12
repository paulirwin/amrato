import * as moment from "moment";

import NetworkMessage from './NetworkMessage';
import { MessageType } from './MessageType';

export enum DecodeMessageType {
    Unknown = "Unknown",
    Direct = "Direct",
    CQ = "CQ",
    CQDX = "CQDX",
    CQOther = "CQOther",
}

export enum DecodeMessageDataType {
    Other,
    GridCode,
    SignalReport,
    ReceiveEnd,
    TransmitEnd,
}

export interface DecodeMessageData {
    raw: string;
    value?: string | number;
    type: DecodeMessageDataType;
}

const gridRx: RegExp = /[A-Z]{2}[0-9]{2}/i;
const sigrepRx: RegExp = /R?[\+\-][0-9]+/;

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

    public messageType: DecodeMessageType;
    public cqType?: "DX" | string;
    public fromCall?: string;
    public toCall?: string;
    public data?: DecodeMessageData;

    // externally-settable
    public lastLotwActivity?: Date;

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

        this.parseMessage();
    }

    get timeString() {
        return moment.utc(this.time).format("HH:mm:ss");
    }

    get isCQ() {
        return this.messageType === DecodeMessageType.CQ
            || this.messageType === DecodeMessageType.CQDX
            || this.messageType === DecodeMessageType.CQOther;
    }

    private parseMessage() {
        const { message } = this;

        const messageParts = message.split(" ");

        this.messageType = this.detectMessageType(messageParts);

        if (this.messageType === DecodeMessageType.Unknown) {
            return;
        }

        if (this.messageType === DecodeMessageType.CQ
            || this.messageType === DecodeMessageType.CQDX
            || this.messageType === DecodeMessageType.CQOther) {
            this.parseCQParts(messageParts);
        } else {
            this.parseDirectParts(messageParts);
        }
    }

    private parseDirectParts(messageParts: string[]) {
        this.toCall = messageParts[0];
        this.fromCall = messageParts[1];

        const dataPart = messageParts[2];

        if (dataPart === "73") {
            this.data = {
                type: DecodeMessageDataType.TransmitEnd,
                raw: dataPart
            };
        } else if (dataPart === "RR73" || dataPart === "RRR") {
            this.data = {
                type: DecodeMessageDataType.ReceiveEnd,
                raw: dataPart
            };
        } else if (gridRx.exec(dataPart)) {
            this.data = {
                type: DecodeMessageDataType.GridCode,
                raw: dataPart,
                value: dataPart
            };
        } else if (sigrepRx.exec(dataPart)) {
            const signal = dataPart.startsWith("R") ? dataPart.substr(1) : dataPart;

            this.data = {
                type: DecodeMessageDataType.SignalReport,
                raw: dataPart,
                value: parseInt(signal, 10)
            };
        } else {
            this.data = {
                type: DecodeMessageDataType.Other,
                raw: dataPart
            };
        }
    }

    private parseCQParts(messageParts: string[]) {
        let callIndex = 1, gridIndex = 2;
        
        if (this.messageType === DecodeMessageType.CQDX
            || this.messageType === DecodeMessageType.CQOther) {
            callIndex = 2;
            gridIndex = 3;
            this.cqType = messageParts[1];
        }
        
        this.fromCall = messageParts[callIndex];

        this.data = {
            type: DecodeMessageDataType.GridCode,
            raw: messageParts[gridIndex],
            value: messageParts[gridIndex],
        };
    }

    private detectMessageType(messageParts: string[]): DecodeMessageType {
        if (messageParts.length > 4) {
            return DecodeMessageType.Unknown;
        }

        if (messageParts[0] === "CQ") {
            if (messageParts.length === 4) {
                if (messageParts[1] === "DX") {
                    return DecodeMessageType.CQDX;
                } 
                    
                return DecodeMessageType.CQOther;
            }
                
            return DecodeMessageType.CQ;
        }
        
        if (messageParts.length === 3) {
            return DecodeMessageType.Direct;
        }
        
        return DecodeMessageType.Unknown;
    }

    toString() {
        return `Decode: ${this.new ? 'new' : 'not-new'} ${this.timeString} ${this.snr.toFixed(0)}dB ${this.mode} ${this.message}`;
    }
}