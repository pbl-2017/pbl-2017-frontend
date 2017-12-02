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

        /*this.deviceListBehaviour.subscribe(list => {
            console.dir(this.deviceListBehaviour.getValue());
        })*/
    }
}

export class APIWrapperImpl{
    constructor(){
        this.deviceListBehaviour = new Rx.BehaviorSubject([]);
        this.updater = new APIUpdaterImpl(this.deviceListBehaviour);
        this.get = new APIGetter(this.deviceListBehaviour);
        this.set = new APISetterImpl(this.deviceListBehaviour,this.get.user);

        /*this.deviceListBehaviour.subscribe(list => {
            //const socket = list.filter(device => device instanceof Socket)[0];
            //socket.isON = !socket.isON;
            //this.set.updateDevice(socket);
            console.dir(this.get.devices.toList());
        });*/
    }
}

class APIGetter{
    constructor(ls) {
        this.user = new User();
        this.devices = new DeviceGetter(ls,this.user);
    }
}

//ユーザー機能は発表までに作る予定はないが、便宜的に作成。
class User{
    constructor(){
        this.id = 1;
    }
}

class DeviceGetter{
    constructor(ls,user) {

        //現状のデバイスのリストを取得
        this.toList = () => {
            if(ls.getValue().length === 0)
                return [];

            return ls.getValue().filter((element,index,array) => {
                return element.userId === user.id;
            });
        }

        //現在のデバイスをdeviceIDで検索
        this.find = (deviceID) => {
            const filterLs = ls.getValue().filter((element,index,array) => {
                return element.id === deviceID && element.userId === user.id;
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
    constructor(list,user){
        //deviceオブジェクトの通りにdeviceを更新(サーバーにプッシュ)
        this.updateDevice = (device) => {

        }
        this.sendQR = (qrCodeID) => {

        }
    }
}

class APISetterImpl extends APISetter{
    constructor(list,user){
        super(list,user);
        this.updateDevice = (device) => {
            DeviceFactory.push(device);
        }
        this.sendQR = (qrCodeID) => {
            const deviceFetch = function(deviceRESTPath,T) {
                return function () {
                    return new Promise((resolve) => {
                        fetch(APIWrapperURL.API_URL + deviceRESTPath)
                            .then(function (res) {
                                return res.json()
                            })
                            .then(function (jsons) {
                                resolve(jsons.map(json => new T(json)));
                            });
                    });
                }
            }

            const fetchSocket = deviceFetch("/socks",Socket);
            const fetchMP3Player = deviceFetch("/mp3_players",MP3Player);


            Promise.all([fetchSocket(),fetchMP3Player()]).then(function (resultAll) {
                let fetchResult = [];
                resultAll.map(devices => devices.forEach(device => fetchResult.push(device)));
                const qrCodeMatchDevices = fetchResult.filter((element,index,array) => {
                    return element.id === qrCodeID;
                });
                console.dir(fetchResult)
                console.dir(qrCodeMatchDevices)
                if(qrCodeMatchDevices.length > 0) {
                    const device = qrCodeMatchDevices[0];
                    device.userId = user.id;
                    DeviceFactory.push(qrCodeMatchDevices[0]);
                }
            });
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