import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-select-cam",
  templateUrl: "./select-cam.component.html",
  styleUrls: ["./select-cam.component.scss"]
})
export class SelectCamComponent implements OnInit {
  public mediaList:any
  public audioList:any
  selected:any={video:null,audio:null}
  constructor(
    public dialogRef: MatDialogRef<SelectCamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    easyrtc.getVideoSourceList(list => {
      console.log(list)
      console.log(environment.soketUrl)
      this.mediaList=list
    });
    easyrtc.getAudioSourceList((audioSrcList)=>{
      console.log(audioSrcList)
      this.audioList=audioSrcList
    });
  }
  onNoClick(): void {
    this.dialogRef.close(this.selected);
  }
  getListId(list){
    let p = list.id
    return p.substring((p.length - 5), p.length)
  }
}
