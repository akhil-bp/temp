/// <reference path="../../assets/easy-rtc/typescript_support/d.ts.files/client/easyrtc.d.ts" />
declare var adapter
import { Component, OnInit, SimpleChanges } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {  SelectCamComponent} from '../core/select-cam/select-cam.component';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  participants: any = [];
  participantsObj: any = {};
  callIDs:any =[]
  myId: string = null;
  haveSelfVideo:boolean = false
  onCalling:boolean = false
  callQueue:any=[]
  selectedVideoId:any
  selectedAudioId:any
  screenShareAdded:boolean=false
  streamInc:Number=0
  constructor(
    private breakpointObserver: BreakpointObserver,
    private skService: SocketService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    easyrtc.setOnError((errorObject)=>{
      console.log(errorObject)
    })
    easyrtc.useThisSocketConnection(this.skService.socket);
    easyrtc.setStreamAcceptor(this.streamAceptor.bind(this));
    easyrtc.joinRoom('my-room', {}, ()=>{
      console.log("Room created")
    }, ()=>{
      
      console.log("Room created Failed" )
    })
    easyrtc.setAcceptChecker(this.setAcceptChecker.bind(this))
    
    // easyrtc.setOnCall(this.setAcceptChecker.bind(this))
    setTimeout(()=>{
      this.openDialog()
    },1000)
  }
  ngAfterViewInit(){
    // this.connect();
    // this.openDialog()

  }
  setAcceptChecker(easyrtcid,cb){
    cb(true,['myCam', 'screen1'])
  }
  streamAceptor(easyrtcid, stream, name) {
    console.log(easyrtcid, name, stream)
    this.participantsObj[easyrtcid] = stream;
  }
  createParticipantArray(roomName, data, isPrimary) {
      console.log(data,"data")
    this.participants = [];
    for (let easyrtcid in data) {
        this.participants.push(easyrtcid);
        // this.performCall(easyrtcid, data[easyrtcid])
    }
  }
  updateMyEasyRTCId(myEasyRTCId: string): void {
    this.myId = myEasyRTCId;
    this.setUpMirror()
  }
  loginSuccess(easyrtcid: string): void {
    console.log(easyrtcid)
    this.updateMyEasyRTCId(easyrtc.cleanId(easyrtcid));
    this.shareCam()
  }

  loginFailure(errorCode: string, message: string): void {
    console.log(message)
    this.updateMyEasyRTCId(null);
  }
  connect(source):void{
    let convertListToButtonShim = (roomName: string,data: Easyrtc_PerRoomData,isPrimary: boolean): void => {
        this.createParticipantArray(roomName, data, isPrimary);
    //   console.log(data, isPrimary,"isPrimary")
    };
    easyrtc.setRoomOccupantListener(convertListToButtonShim);
    this._connect(source)
  }
  call(ev): void {

  }
  _connect(source):void{
    console.log(source,'HERE')
    easyrtc.setAutoInitUserMedia(false);
    // easyrtc.initMediaSource(()=>{
      easyrtc.connect(
        "easyrtc.multistream",
        this.loginSuccess.bind(this),
        this.loginFailure.bind(this)
      );
    // /},(errorCode, errorText)=>{
    //   console.log(errorCode, errorText)
    // },'myCam')
   
  }
  callOthers(cb){
   
  }
  performCall(otherEasyrtcid, data) {
    var acceptedCB = (accepted, easyrtcid) => {
      if (!accepted) {
        easyrtc.showError(
          "CALL-REJECTEd",
          "Sorry, your call to " + easyrtc.idToName(easyrtcid) + " was rejected"
        );
      }
    };

    var successCB = (e,r) => {
    
    };
    var failureCB = function(r,q) {
      // console.log(r,q)
    };
    // let keys = Object.keys(data.apiField.mediaIds.fieldValue)
    let keys = ['screen1', 'myCam']
    if(!this.participantsObj[otherEasyrtcid]){
      easyrtc.call(otherEasyrtcid, successCB, failureCB, acceptedCB, keys);
    }
  }
  setUpMirror(stream="myCam") {
    // if( !this.haveSelfVideo) {
        var selfVideo:HTMLVideoElement = <HTMLVideoElement>document.getElementById("videoSelf");
        selfVideo.style.transform = 'rotateY(180deg);'
        easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream(stream));
        selfVideo.muted = true;
        this.haveSelfVideo = true;
    // }
  }
  screenSharing(type){
    // easyrtc.hangup(this.myId)
    if(type === 'start'){
      this.localFn()
    }
  }
  addStreamStopListener(stream){
    let streamEndedEvent = "ended";
    if ("oninactive" in stream) {
      streamEndedEvent = "inactive";
    }
    stream.addEventListener(
      streamEndedEvent,
      () => {
        
        easyrtc.closeLocalStream('screen1')
        easyrtc.closeLocalStream('myCam')
        this.shareCam()
        // easyrtc.closeLocalStream('myCam')
        
      },
      false
    );
  }
  createLocalVideo(stream, streamName, cb:Function=()=>{}){
    this.participants.map((id)=>{
      easyrtc.addStreamToCall(id, streamName,()=>{
        console.log("ADDERD")
      })
    })
  }
  localFn(){  
    let isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor);

    easyrtc.setVideoDims(1366,768, undefined)
    easyrtc.closeLocalStream('screen1')
    easyrtc.closeLocalStream('myCam')
    if(!isChrome){
      this.checkWitMoz()
      return
    } 
    easyrtc['initDesktopStream']((stream, streamName)=> {
          // easyrtc.closeLocalStream('myCam')
          this.addStreamStopListener(stream)
          this.createLocalVideo(stream, 'screen1');
      },(errCode, errText)=> {
          easyrtc.showError(errCode, errText);
      }, 'screen1');
  }
  checkWitMoz(){
    easyrtc._presetMediaConstraints = {
      video: {
        mediaSource: 'screen'
      }
    };
    this.triggerIceRestart('screen1')
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SelectCamComponent);

    dialogRef.afterClosed().subscribe(result => {
        console.log(result," dialog afterClosed")
      this.connect(result)
      this.selectedVideoId = result.video 
      this.selectedAudioId = result.audio 
    });
  }

  shareCam(){
    easyrtc._presetMediaConstraints = {
      video: { 
        width: 320, 
        height: 320
      },
      audio: true
    };
    console.log('this.shareCam', easyrtc._presetMediaConstraints)
    easyrtc.setVideoDims(320, 320, undefined)
    easyrtc.setVideoSource(this.selectedVideoId)
    easyrtc.setAudioSource(this.selectedAudioId)
    this.triggerIceRestart()

    // var localFilter = this.buildSdpFilter( {
    //   audioRecvBitrate:20, videoRecvBitrate:30
    // });
    // var remoteFilter = this.buildSdpFilter({
    //     audioSendBitrate: 20, videoSendBitrate:30
    // });
    // easyrtc.setSdpFilters(localFilter, remoteFilter);
  }
  triggerIceRestart(streamName='myCam'){
    easyrtc.initMediaSource(()=>{
      console.log('this.shareCam', easyrtc._presetMediaConstraints)
      this.createLocalVideo(null, streamName)
      this.setUpMirror()
    },(error)=>{
      console.log('media-source', error)
    }, streamName)
  }
  buildSdpFilter(options, isLocal=undefined) {

    var audioSendBitrate = options.audioSendBitrate;
    var audioRecvBitrate = options.audioRecvBitrate;
    var videoRecvBitrate = options.videoRecvBitrate;
    var videoSendBitrate = options.videoSendBitrate;
    var videoSendInitialBitrate = options.videoSendInitialBitrate;
    var audioSendCodec = options.audioSendCodec || '';
    var audioRecvCodec = options.audioRecvCodec || '';
    var videoSendCodec = options.videoSendCodec || '';
    var videoRecvCodec = options.videoRecvCodec || '';
    var stereo = options.stereo;
    
    // these functions were cribbed from the google apprtc.appspot.com demo.

    function findLineInRange(sdpLines, startLine, endLine, prefix, substr=undefined) {
        var realEndLine = endLine !== -1 ? endLine : sdpLines.length;
        for (var i = startLine; i < realEndLine; ++i) {
            if (sdpLines[i].indexOf(prefix) === 0) {
                if (!substr || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
                    return i;
                }
            }
        }
        return null;
    }

    function findLine(sdpLines, prefix, substr=undefined) {
        return findLineInRange(sdpLines, 0, -1, prefix, substr);
    }

    function preferBitRate(sdp, bitrate, mediaType) {
        var sdpLines = sdp.split('\r\n');
        var mLineIndex = findLine(sdpLines, 'm=', mediaType);
        if (mLineIndex === null) {
            console.log('Failed to add bandwidth line to sdp, as no m-line found');
            return sdp;
        }
        var nextMLineIndex = findLineInRange(sdpLines, mLineIndex + 1, -1, 'm=');
        if (nextMLineIndex === null) {
            nextMLineIndex = sdpLines.length;
        }
        var cLineIndex = findLineInRange(sdpLines, mLineIndex + 1, nextMLineIndex, 'c=');
        if (cLineIndex === null) {
            console.log('Failed to add bandwidth line to sdp, as no c-line found');
            return sdp;
        }
        var bLineIndex = findLineInRange(sdpLines, cLineIndex + 1, nextMLineIndex, 'b=AS');
        if (bLineIndex) {
            sdpLines.splice(bLineIndex, 1);
        }

        var bwLine;
        if (
            adapter && adapter.browserDetails &&
                 (adapter.browserDetails.browser === "firefox")
        ) {
            bitrate =  (bitrate >>> 0) * 1000;
            bwLine = 'b=TIAS:' + bitrate;
        } else {
            bwLine = 'b=AS:' + bitrate;
        }

        sdpLines.splice(cLineIndex + 1, 0, bwLine);
        sdp = sdpLines.join('\r\n');
        return sdp;
    }

    function setDefaultCodec(mLine, payload) {
        var elements = mLine.split(' ');
        var newLine = [];
        var index = 0;
        for (var i = 0; i < elements.length; i++) {
            if (index === 3) {
                newLine[index++] = payload;
            }
            if (elements[i] !== payload) {
                newLine[index++] = elements[i];
            }
        }
        return newLine.join(' ');
    }

    function maybeSetAudioSendBitRate(sdp) {
        if (!audioSendBitrate) {
            return sdp;
        }
        console.log('Prefer audio send bitrate: ' + audioSendBitrate);
        return preferBitRate(sdp, audioSendBitrate, 'audio');
    }

    function maybeSetAudioReceiveBitRate(sdp) {
        if (!audioRecvBitrate) {
            return sdp;
        }
        console.log('Prefer audio receive bitrate: ' + audioRecvBitrate);
        return preferBitRate(sdp, audioRecvBitrate, 'audio');
    }

    function maybeSetVideoSendBitRate(sdp) {
        if (!videoSendBitrate) {
            return sdp;
        }
        console.log('Prefer video send bitrate: ' + videoSendBitrate);
        return preferBitRate(sdp, videoSendBitrate, 'video');
    }

    function maybeSetVideoReceiveBitRate(sdp) {
        if (!videoRecvBitrate) {
            return sdp;
        }
        console.log('Prefer video receive bitrate: ' + videoRecvBitrate);
        return preferBitRate(sdp, videoRecvBitrate, 'video');
    }
    
    function getCodecPayloadType(sdpLine) {
        var pattern = new RegExp('a=rtpmap:(\\d+) \\w+\\/\\d+');
        var result = sdpLine.match(pattern);
        return (result && result.length === 2) ? result[1] : null;
    }

    function maybeSetVideoSendInitialBitRate(sdp) {
        if (!videoSendInitialBitrate) {
            return sdp;
        }
        var maxBitrate = videoSendInitialBitrate;
        if (videoSendBitrate) {
            if (videoSendInitialBitrate > videoSendBitrate) {
                console.log('Clamping initial bitrate to max bitrate of ' + videoSendBitrate + ' kbps.');
                videoSendInitialBitrate = videoSendBitrate;
            }
            maxBitrate = videoSendBitrate;
        }
        var sdpLines = sdp.split('\r\n');
        var mLineIndex = findLine(sdpLines, 'm=', 'video');
        if (mLineIndex === null) {
            console.log('Failed to find video m-line');
            return sdp;
        }
        var vp8RtpmapIndex = findLine(sdpLines, 'a=rtpmap', 'VP8/90000');
        var vp8Payload = getCodecPayloadType(sdpLines[vp8RtpmapIndex]);
        var vp8Fmtp = 'a=fmtp:' + vp8Payload + ' x-google-min-bitrate=' + videoSendInitialBitrate.toString() + '; x-google-max-bitrate=' + maxBitrate.toString();
        sdpLines.splice(vp8RtpmapIndex + 1, 0, vp8Fmtp);
        return sdpLines.join('\r\n');
    }

    function preferCodec(sdp, codec, codecType){
        var sdpLines = sdp.split('\r\n');
        var mLineIndex = findLine(sdpLines, 'm=', codecType);
        if (mLineIndex === null) {
            return sdp;
        }
        //
        // there are two m= lines in the sdp, one for audio, one for video.
        // the audio one comes first. when we search for codecs for audio, we
        // want stop before we enter the section for video, hence we'll hunt 
        // for that subsequent m= line before we look for codecs. Otherwise,
        // you could ask for a audio codec of VP9.
        //
        var mBottom = findLineInRange(sdpLines, mLineIndex+1, -1, "m=") || -1;

        var codecIndex = findLineInRange(sdpLines, mLineIndex, mBottom, 'a=rtpmap', codec);
        if (codecIndex) {
            var payload = getCodecPayloadType(sdpLines[codecIndex]);
            if (payload) {
                sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex], payload);
            }
        }
        sdp = sdpLines.join('\r\n');
        return sdp;
    } 

    function maybePreferVideoSendCodec(sdp) {
        if (videoSendCodec === '') {
            console.log('No preference on video send codec.');
            return sdp;
        }
        console.log('Prefer video send codec: ' + videoSendCodec);
        return preferCodec(sdp, videoSendCodec, 'video');
    }

    function maybePreferVideoReceiveCodec(sdp) {
        if (videoRecvCodec === '') {
            console.log('No preference on video receive codec.');
            return sdp;
        }
        console.log('Prefer video receive codec: ' + videoRecvCodec);
        return preferCodec(sdp, videoRecvCodec,'video');
    } 

    function maybePreferAudioSendCodec(sdp) {
        if (audioSendCodec === '') {
            console.log('No preference on audio send codec.');
            return sdp;
        }
        console.log('Prefer audio send codec: ' + audioSendCodec);
        return preferCodec(sdp, audioSendCodec, 'audio');
    }

    function maybePreferAudioReceiveCodec(sdp) {
        if (audioRecvCodec === '') {
            console.log('No preference on audio receive codec.');
            return sdp;
        }
        console.log('Prefer audio receive codec: ' + audioRecvCodec);
        return preferCodec(sdp, audioRecvCodec, 'audio');
    } 

    function addStereo(sdp) {
        var sdpLines = sdp.split('\r\n');
        var opusIndex = findLine(sdpLines, 'a=rtpmap', 'opus/48000');
        var opusPayload;
        if (opusIndex) {
            opusPayload = getCodecPayloadType(sdpLines[opusIndex]);
        }
        var fmtpLineIndex = findLine(sdpLines, 'a=fmtp:' + opusPayload.toString());
        if (fmtpLineIndex === null) {
            return sdp;
        }
        sdpLines[fmtpLineIndex] = sdpLines[fmtpLineIndex].concat('; stereo=1');
        sdp = sdpLines.join('\r\n');
        return sdp;
    }

    if( isLocal ) {
        return function(insdp) {
            console.log("modifying local sdp");
            var sdp;
            sdp = maybePreferAudioReceiveCodec(insdp);
            sdp = maybePreferVideoReceiveCodec(insdp);
            sdp = maybeSetAudioReceiveBitRate(sdp);
            sdp = maybeSetVideoReceiveBitRate(sdp);
            //if( sdp != insdp ) {
            //    console.log("changed the sdp from \n" + insdp + "\nto\n" + sdp);
            //}
            return sdp;
        };
    }
    else {
        return function(insdp) {
            console.log("modifying remote sdp");
            var sdp;
            sdp = maybePreferAudioSendCodec(insdp);
            sdp = maybePreferVideoSendCodec(insdp);
            sdp = maybeSetAudioSendBitRate(sdp);
            sdp = maybeSetVideoSendBitRate(sdp);
            sdp = maybeSetVideoSendInitialBitRate(sdp);
            if (stereo) {
                sdp = addStereo(sdp);
            }
            //if( sdp != insdp ) {
            //    console.log("changed the sdp from \n" + insdp + "\nto\n" + sdp);
            //}
            return sdp;
        };
    }
}
    
}
