//import * as fetch from "node-fetch";
import APIWrapperURL from "./APIWrapperURL"

export class DeviceFactory {
    static create(originJson){
        return originJson.map((json) => {
            switch (deviceKind){
                case Socket.deviceKind:
                    return new Socket(json);
                    break;
                case MP3Player.deviceKind:
                    return new MP3Player(json);
                    break;
            }
        });
    }

    static push(device){
        const id = device.deviceID;
        const json = device.toJsonForPost();
        const method = "PUT";
        const body = JSON.stringify(json);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(device.deviceAPIURL+"/"+device.dbid,{method,headers,body});
    }
}


class Device{
    constructor(json){
        this.id = json.deviceID;
        this.dbid = json.id;
        this.toJsonForPost = () => {return "json"}
    }

    static get deviceKind(){
        return "Device"
    }

    get deviceAPIURL(){
        return APIWrapperURL.API_URL
    }

}

//Socket

//Socket.id → 端末のID,QRコードに相当
//Socket.isON →ONOFFかどうか
export class Socket extends Device{
    constructor(json){
        super(json);
        this.isON = json.isON;
        this.toJsonForPost = () => {
            return {
                "deviceID" : this.id,
                "isON" : this.isON
                }
            }
        }
    static get deviceKind(){
        return "socket"
    }
    get deviceAPIURL(){
        return APIWrapperURL.API_URL+"/socks"
    }
}

//MP3Player
//MP3Player.id → 端末のID,QRコードに相当
//MP3Player.isON →ONOFFかどうか

export class MP3Player extends Device{
    constructor(json){
        super(json);
        this.isPlay = json.isPlay;
        this.musicNumber = json.musicNumber;
        this.toJsonForPost = () => {
            return {
                "deviceID" : this.id,
                "isPlay" : this.isPlay,
                "musicNumber" : this.musicNumber
                }
            }
        }
    static get deviceKind(){
        return "mp3Player"
    }
    get deviceAPIURL(){
        return APIWrapperURL.API_URL+"/mp3_players"
    }
}