import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-controls',
  templateUrl: './my-controls.component.html',
  styleUrls: ['./my-controls.component.scss']
})
export class MyControlsComponent implements OnInit {
  @Output() call = new EventEmitter()
  @Output() hangUp = new EventEmitter()
  @Output() muteAudio = new EventEmitter()
  @Output() muteVideo = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  connect(){
    this.call.emit('connect')
  }

}
