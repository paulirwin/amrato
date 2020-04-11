import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Socket } from 'dgram';
import * as moment from "moment";

import MessageParser from './messages/MessageParser';
import HeartbeatMessage from './messages/HeartbeatMessage';
import { MessageType } from './messages/MessageType';
import DecodeMessage, { DecodeMessageDataType } from './messages/DecodeMessage';
import { SettingsService } from '../services/settings.service';
import { LotwService } from '../services/lotw.service';
import { GridCodeService } from '../services/grid-code.service';
import { MatTableDataSource } from '@angular/material/table';

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
export class WsjtxComponent implements OnInit, OnDestroy {

    socket: Socket;
    status: ListenerStatus = ListenerStatus.Disconnected;
    lastSeen: Date;
    lastHeartbeat: HeartbeatMessage = null;

    mycall: string;
    mygrid: string;
    private _cqOnly: boolean = false;

    messages: DecodeMessage[] = [];
    dataSource = new MatTableDataSource<DecodeMessage>();

    displayedColumns = ["timeString", "snr", "deltaTime", "deltaFrequency", "message", "distance", "azimuth", "tags"];

    constructor(private electronService: ElectronService,
        settingsService: SettingsService,
        private lotwService: LotwService,
        private gridCodeService: GridCodeService) {
        this.mycall = settingsService.callsign;
        this.mygrid = settingsService.gridCode;
    }

    async ngOnInit() {
        this.dataSource.filterPredicate = (data, filter) => !this.cqOnly || data.isCQ;        

        this.lotwService.initialize();

        const dgram = this.electronService.remote.require("dgram");

        const socket: Socket = dgram.createSocket("udp4");
        this.socket = socket;

        socket.on('message', async (msg, rinfo) => {
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
                    const decodeMessage = message as DecodeMessage;
                    decodeMessage.lastLotwActivity = await this.lastLotwActivity(decodeMessage);
                    this.messages.splice(0, 0, decodeMessage);
                    this.dataSource.data = this.messages;
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

    ngOnDestroy() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    checkLastSeen() {
        const now = new Date();
        if (this.lastSeen && this.lastSeen < moment(now).subtract(30, 'seconds').toDate()) {
            this.status = ListenerStatus.Listening;
        }
    }

    async lastLotwActivity(message: DecodeMessage): Promise<Date | null> {
        if (!message?.fromCall) {
            return null;
        }

        return await this.lotwService.getUserLastActivity(message.fromCall);
    }

    hasLotwActivity(message: DecodeMessage): boolean {
        return message.lastLotwActivity
            ? moment.utc(message.lastLotwActivity).toDate() > moment.utc().subtract(1, "year").toDate()
            : false;
    }

    computeDistanceKm(message: DecodeMessage): string {
        if (!this.mygrid || message?.data?.type !== DecodeMessageDataType.GridCode) {
            return null;
        }

        const dist = this.gridCodeService.computeDistanceKm(this.mygrid, message.data.value as string);

        return dist.toFixed(0) + " km";
    }

    computeAzimuth(message: DecodeMessage): string {
        if (!this.mygrid || message?.data?.type !== DecodeMessageDataType.GridCode) {
            return null;
        }

        const az = this.gridCodeService.computeAzimuth(this.mygrid, message.data.value as string);

        return az.toFixed(0) + "°";
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

    get cqOnly() {
        return this._cqOnly;
    }

    set cqOnly(value: boolean) {
        this._cqOnly = value;
        this.dataSource.filter = value ? "cqOnly" : "";
    }
}
