import APIWrapperURL from "./APIWrapperURL"
import {APIUpdaterImpl,APIUpdaterMock} from "./APIUpdater"
import * as Rx from "rx";
import {DeviceFactory,Socket,MP3Player} from "./Devices";

export default class APIWrapper{
    constructor(){
        this.deviceListBehaviour = new Rx.BehaviorSubject([]);
        this.updater = new APIUpdaterMock(this.deviceListBehaviour);
        this.get = new APIGetter(this.deviceListBehaviour);
        this.set = new APISetterMock(this.deviceListBehaviour);

        this.deviceListBehaviour.subscribe(list => {
            console.dir(this.deviceListBehaviour.getValue());
        })
    }
}

export class APIWrapperImpl{
    constructor(){
        this.deviceListBehaviour = new Rx.BehaviorSubject([]);
        this.updater = new APIUpdaterImpl(this.deviceListBehaviour);
        this.get = new APIGetter(this.deviceListBehaviour);
        this.set = new APISetterImpl(this.deviceListBehaviour);

        this.deviceListBehaviour.subscribe(list => {
            //const socket = list.filter(device => device instanceof Socket)[0];
            //socket.isON = !socket.isON;
            //this.set.updateDevice(socket);
            console.dir(this.deviceListBehaviour.getValue());
        });
    }
}

class APIGetter{
    constructor(ls) {
        this.devices = new DeviceGetter(ls);
    }
}

class DeviceGetter{
    constructor(ls) {

        //現状のデバイスのリストを取得
        this.toList = () => {
            return ls.getValue();
        }

        //現在のデバイスをdeviceIDで検索
        this.find = (deviceID) => {
            const filterLs = ls.getValue().filter((element,index,array) => {
                return element.id === deviceID;
            });
            if(filterLs.length > 0)
                return filterLs[0]
            return null
        }

        //リストの更新時に引数にデバイスリストを持つ関数を呼び出すようにする
        this.setEvent = (func) => {
            ls.subscribe(function(x){
                func(x);
            })
        }

    }
}

class APISetter{
    constructor(list){
        //deviceオブジェクトの通りにdeviceを更新(サーバーにプッシュ)
        this.updateDevice = (device) => {

        }
        this.sendQR = (qrCodeID) => {}
    }
}

class APISetterImpl extends APISetter{
    constructor(list){
        super(list);
        this.updateDevice = (device) => {
            DeviceFactory.push(device);
        }
    }
}

class APISetterMock extends APISetter{
    constructor(list){
        super(list);
        this.updateDevice = (device) => {
            let ls = list.getValue();
            const originDevice = ls.filter(d => d.id === device.id)[0]
            const deviceIndex = ls.indexOf(originDevice);
            ls[deviceIndex] = device;
            list.onNext(ls);
        }

        /*const json = {
            "deviceID" : "socket1",
            "deviceKind": "socket",
            "parameter" :{
                "isON" : false
            }
        }

        const device = DeviceFactory.create([json])[0];
        this.updateDevice(device);*/

    }
}


class Finder{
    constructor(findParameter){
        this.list = [];
        this.find = (id) => {
            const ls = this.list.filter(x => x.id===id);
            if(ls.length > 0)
            {
                return ls[0]
            }
            else
            {
                return null
            }
        }
    }
}