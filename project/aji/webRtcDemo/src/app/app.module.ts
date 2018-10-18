import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MatGridListModule, MatSelectModule, MatDialogModule, MatCardModule, MatTabsModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { RoutingModule } from './routing.module';
import { AdminComponent } from './admin/admin.component';
import { ChatComponent } from './main/chat/chat.component';
import { MyControlsComponent } from './main/my-controls/my-controls.component';
import { MyVideoComponent } from './main/my-video/my-video.component';
import { ParticipantComponent } from './main/participant/participant.component';
import { ConfHeaderComponent } from './main/conf-header/conf-header.component';
import {  SelectCamComponent} from './core/select-cam/select-cam.component';
// import  'socket.io-client'
// import '../assets/easy-rtc.js'
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AdminComponent,
    ChatComponent,
    MyControlsComponent,
    MyVideoComponent,
    ParticipantComponent,
    ConfHeaderComponent,
    SelectCamComponent
  ],
  entryComponents:[SelectCamComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
