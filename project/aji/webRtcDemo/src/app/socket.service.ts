import { Injectable } from '@angular/core';
import * as io from  '../assets/socket-io/socket.io.js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  
  constructor() {
    
    this.initSocket()
  }
  
  initSocket(): void {
    
    this.socket = io(environment.soketUrl);
  }

}
