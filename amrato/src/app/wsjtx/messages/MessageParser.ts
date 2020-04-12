import NetworkMessage from './NetworkMessage';
import HeartbeatMessage from './HeartbeatMessage';
import DecodeMessage from './DecodeMessage';
import StatusMessage from './StatusMessage';

export default class MessageParser {
    public static parse(dataView: DataView): NetworkMessage {
        const type = dataView.getUint32(8);
        const newDv = new DataView(dataView.buffer.slice(12));

        switch (type) {
            case 0:
                return new HeartbeatMessage(newDv);
            case 1:
                return new StatusMessage(newDv);
            case 2:
                return new DecodeMessage(newDv);
        }

        return null;
    }
}