import { Component, OnInit, Input, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  @Input() participant:string=""
  @Input() stream:any
  @Output() connect:any = new EventEmitter()
  @ViewChild('videoCaller') videoCaller
  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      // this.connect.emit(this.participant)
      // this.performCall(this.participant)
    },2000)
  }
  performCall(otherEasyrtcid) {
    this.connect.emit(this.participant)
    // emitCall()
    // easyrtc.getRemoteStream(otherEasyrtcid,'myCam')
    // var acceptedCB = (accepted, easyrtcid) => {
    //   console.log(accepted, easyrtcid)
    //   if (!accepted) {
    //     easyrtc.showError(
    //       "CALL-REJECTEd",
    //       "Sorry, your call to " + easyrtc.idToName(easyrtcid) + " was rejected"
    //     );
    //   }
    // };

    // var successCB = () => {
    //   console.log("JJJ")
    //   if (easyrtc.getLocalStream()) {
    //     // this.setUpMirror();
    //   }
    // };
    // var failureCB = function(r,p) {
    //   console.log(r,p, otherEasyrtcid)
    //   if(r=== 'ALREADY_CONNECTED'){
    //     // easyrtc.hangup(otherEasyrtcid)
    //   }
    // };
    // console.log(this.participant)
    // easyrtc.call(this.participant, successCB, failureCB, acceptedCB, undefined);
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes.hasOwnProperty('stream')){
      easyrtc.setVideoObjectSrc(this.videoCaller.nativeElement, this.stream)
    }
  }


}
