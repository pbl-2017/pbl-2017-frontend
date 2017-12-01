import APIWrapperURL from "./APIWrapperURL"
import * as Rx from "rx";
import {DeviceFactory,Socket,MP3Player} from "./Devices"

class APIUpdater{
    constructor(behaviourLs,transformer,fetcher)
    {
        this.originJsonBehaviour = new Rx.BehaviorSubject([]);
        this.originJsonBehaviour.subscribe(function (x) {
            behaviourLs.onNext(transformer.transform(x));
        });

        fetcher.start(this.originJsonBehaviour);
    }
}

export class APIUpdaterMock extends APIUpdater{
    constructor(behaviourLs)
    {
        super(behaviourLs,new NonTransformer(),new FetcherMock())
    }
}

export class APIUpdaterImpl extends APIUpdater{
    constructor(behaviourLs)
    {
        super(behaviourLs,new NonTransformer(),new FetcherImpl())
    }
}

class Transformer{
    constructor(){
        this.transform = (originJson) => {
            return DeviceFactory.create(originJson);
        }
    }
}

class NonTransformer extends Transformer{
    constructor() {
        super();
        this.transform = (deviceList) => {
            return deviceList;
        }
    }
}

class Fetcher{
    constructor(){
        this.start = (originJsonBehaviour) => {

        }
    }
}

export class FetcherImpl extends Fetcher{

    constructor(){
        super();
        this.start = (originJsonBehaviour) =>{
            Rx.Observable.interval(1000).subscribe(function(x){
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
                    if (JSON.stringify(fetchResult) !== JSON.stringify(originJsonBehaviour.getValue()))
                        originJsonBehaviour.onNext(fetchResult);
                });
            })
        }
    }

}

class FetcherMock extends Fetcher{
    constructor(){
        super();
        /*const json1 = [
            {
                "deviceID" : "socket1",
                "deviceKind": "socket",
                    "isON" : true
                }
            },
            {
                "deviceID" : "mp3Player1",
                "deviceKind": "mp3Player",
                "parameter" : {
                    "isPlay" : true,
                    "musicNumber" :1
                }
            }
        ];

        const json2 = [
            {
                "deviceID": "hogehoge",
                "deviceKind": "socket",
                "parameter": {
                    "isON": false
                }
            },
            {
                "deviceID" : "hogehogehoge",
                "deviceKind": "mp3Player",
                "parameter" : {
                    "isPlay" : true,
                    "musicNumber" :2
                }
            }
        ];

        const json3 = [
            {
                "deviceID": "hogehoge",
                "deviceKind": "socket",
                "parameter": {
                    "isON": false
                }
            },
            {
                "deviceID" : "hogehogehoge",
                "deviceKind": "mp3Player",
                "parameter" : {
                    "isPlay" : false,
                    "musicNumber" :1
                }
            }
        ]*/

        const devices = [
            new Socket({
                "deviceID" : "socket1",
                "deviceKind": "socket",
                "isON" : true
            }),
            new MP3Player({
                "deviceID" : "mp3Player1",
                "deviceKind": "mp3Player",
                "isPlay" : true,
                "musicNumber" :1
            })
        ]

        this.start = (originJsonBehaviour) =>{
            originJsonBehaviour.onNext(devices);
        }
    }
}