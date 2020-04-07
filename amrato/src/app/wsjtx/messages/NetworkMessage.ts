import * as moment from "moment";

import { MessageType } from './MessageType';

export default abstract class NetworkMessage {

    private static utf8 = new TextDecoder();

    constructor(protected dataView: DataView, public type: MessageType) {
    }

    protected getString(offset: number) {
        const length = this.dataView.getUint32(offset);
        const bytes = this.dataView.buffer.slice(offset + 4, offset + 4 + length);
        return { 
            value: NetworkMessage.utf8.decode(bytes), 
            length,
            start: offset + 4,
            end: offset + 4 + length,
        };
    }

    protected getBool(offset: number) {
        return this.dataView.getUint8(offset) === 1;
    }

    protected getDateFromQTime(offset: number) {
        const ms = this.dataView.getUint32(offset);

        return moment.utc().startOf("day").add(ms, "milliseconds").toDate();
    }
}