import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Socket } from 'dgram';
import * as moment from "moment";
import MessageParser from './messages/MessageParser';
import HeartbeatMessage from './messages/HeartbeatMessage';
import { MessageType } from './messages/MessageType';
import DecodeMessage from './messages/DecodeMessage';

enum ListenerStatus {
    Disconnected = "disconnected",
    Listening = "listening",
    Connected = "connected",
}

@Component({
    selector: 'app-wsjtx',
    templateUrl: './wsjtx.component.html',
    styleUrls: ['./wsjtx.component.scss']
})
export class WsjtxComponent implements OnInit {

    status: ListenerStatus = ListenerStatus.Disconnected;
    lastSeen: Date;
    lastHeartbeat: HeartbeatMessage = null;

    messages: DecodeMessage[] = [];

    constructor(private electronService: ElectronService) { }

    ngOnInit(): void {
        const dgram = this.electronService.remote.require("dgram");

        const socket: Socket = dgram.createSocket("udp4");
        
        socket.on('message', (msg, rinfo) => {
            if (msg.length < 4) {
                return;
            }

            const dv = new DataView(msg.buffer, 0);

            const magic = dv.getUint32(0);

            // Confirm WSJT-X magic header
            if (magic !== 0xadbccbda) {
                return;
            }

            this.status = ListenerStatus.Connected;
            this.lastSeen = new Date();

            // TODO: handle schema version?

            const message = MessageParser.parse(dv);

            if (message) {
                console.log(message.toString());

                if (message.type === MessageType.Heartbeat) {
                    this.lastHeartbeat = message as HeartbeatMessage;
                } else if (message.type === MessageType.Decode) {
                    this.messages.splice(0, 0, message as DecodeMessage);
                }
            } else {
                console.log("Unhandled WSJT-X Message", msg);
            }
        });

        socket.on('listening', () => {
            console.log("UDP Server Listening");
            this.status = ListenerStatus.Listening;
        });

        socket.bind(2237);

        setInterval(this.checkLastSeen.bind(this), 5000);
    }

    checkLastSeen() {
        const now = new Date();
        if (this.lastSeen && this.lastSeen < moment(now).subtract(30, 'seconds').toDate()) {
            this.status = ListenerStatus.Listening;
        }
    }

    get statusString() {
        switch (this.status) {
            case ListenerStatus.Connected:
                if (this.lastHeartbeat) {
                    return `Connected to ${this.lastHeartbeat.id} v${this.lastHeartbeat.version}`;
                } else {
                    return "Waiting for WSJT-X heartbeat message..."
                }
            case ListenerStatus.Disconnected:
                return "Disconnected";
            case ListenerStatus.Listening:
                return "Waiting for UDP packets from WSJT-X...";
        }
    }
}
