import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conf-header',
  templateUrl: './conf-header.component.html',
  styleUrls: ['./conf-header.component.scss']
})
export class ConfHeaderComponent implements OnInit {

  @Output() screenSharing =new EventEmitter()
  @Output() startStopSH =new EventEmitter()
  shareStatus:boolean = false
  constructor() { }

  ngOnInit() {
  }
  shareScreen(){
    if(!this.shareStatus) this.screenSharing.emit('start')
    else this.screenSharing.emit('stop')
    this.shareStatus=!this.shareStatus
  }

}
