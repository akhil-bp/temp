/// <reference path="../../../assets/easy-rtc/typescript_support/d.ts.files/client/easyrtc.d.ts" />
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
// declare var easyrtc:any

@Component({
  selector: "app-my-video",
  templateUrl: "./my-video.component.html",
  styleUrls: ["./my-video.component.scss"]
})
export class MyVideoComponent implements OnInit {

  constructor(private cdr:ChangeDetectorRef) { }

  myId:string = '';
  connectedClientsList:Array<string> = [];
  ngOnInit(){

  }
  clearConnectList():void {
    this.connectedClientsList = [];
    this.cdr.detectChanges();
  }
  
  performCall(clientEasyrtcId:string):void {
    console.log(clientEasyrtcId)
    let successCB = function(a:string, b:string):void {};
    let failureCB = function(a:string, b:string):void {};
    easyrtc.call(clientEasyrtcId, successCB, failureCB, undefined, undefined);
  }

  buildCaller(easyrtcid:string):(()=>void) {
    return ():void => {
      this.performCall(easyrtcid);
    };
  }

  convertListToButtons (roomName:string, data:Easyrtc_PerRoomData, isPrimary:boolean):void {
    
    this.clearConnectList();
    for(let easyrtcid in data) {
      this.connectedClientsList.push(easyrtc.idToName(easyrtcid));
      console.log("====", easyrtcid)
      this.buildCaller(easyrtcid)()
    }
    this.cdr.detectChanges();
  }

  updateMyEasyRTCId(myEasyRTCId:string):void {
    console.log(myEasyRTCId)
    this.myId = myEasyRTCId;
    this.cdr.detectChanges();
  }
  
  loginSuccess(easyrtcid:string):void {
    this.updateMyEasyRTCId(easyrtc.cleanId(easyrtcid));
  }
  
  loginFailure(errorCode:string, message:string):void {
    this.updateMyEasyRTCId('Login failed. Reason: '+ message);
  }

  connect(): void {
    // easyrtc.joinRoom('my-room', {}, ()=>{
    //   console.log("Room created")
    // }, ()=>{
      
    //   console.log("Room created Failed" )
    // })
    // easyrtc.setVideoDims(320, 320, undefined);

    // easyrtc.initMediaSource(()=>{
    //   easyrtc.connect(
    //     "easyrtc.audioVideo",
    //     this.loginSuccess.bind(this),
    //     this.loginFailure.bind(this)
    //   );
    // },(errorCode, errorText)=>{
    //   console.log(errorCode, errorText)
    // },undefined)
   
  }

  ngAfterViewInit() {
    // this.connect();
  }
}
