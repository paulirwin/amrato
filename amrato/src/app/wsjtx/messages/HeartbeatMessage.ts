import NetworkMessage from './NetworkMessage';
import { MessageType } from './MessageType';

export default class HeartbeatMessage extends NetworkMessage {

    public id: string;
    public maximumSchemaNumber: number;
    public version: string;
    public revision: string;

    constructor(dataView: DataView) {
        super(dataView, MessageType.Heartbeat);

        const idstr = this.getString(0);
        this.id = idstr.value;

        this.maximumSchemaNumber = dataView.getUint32(idstr.end);

        const versionstr = this.getString(idstr.end + 4);
        this.version = versionstr.value;
        
        const revisionstr = this.getString(versionstr.end);
        this.revision = revisionstr.value;
    }

    toString() {
        return `Heartbeat: ${this.id} Version ${this.version} Revision ${this.revision}`;
    }
}