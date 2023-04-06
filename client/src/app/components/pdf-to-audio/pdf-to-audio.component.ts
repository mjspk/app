import { Component, ViewChild, ElementRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AudioHelper } from "src/app/helpers/audioHelper";
import { TxtHelper } from "src/app/helpers/txtHelper";
import { TextAudioPlayerComponent } from "../text-audio-player/text-audio-player.component";


@Component({
  selector: 'app-pdf-to-audio',
  templateUrl: './pdf-to-audio.component.html',
  styleUrls: ['./pdf-to-audio.component.css']
})
export class PdfToAudioComponent {
  constructor(private txtHelper: TxtHelper, public dialog: MatDialog) { }
  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  files: any[] = [];
  isControlEnabled = false;

  onFileDropped($event: any[]) {
    this.prepareFilesList($event);
  }


  fileBrowseHandler(evt: any) {
    const files = evt.target.files;
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }


  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        this.isControlEnabled = true;
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  selectedFile: any;
  prepareFilesList(files: any[]) {
    this.files = [];
    if (files.length > 0) {
      this.selectedFile = files[0];
      this.selectedFile.progress = 0;
      this.files.push(this.selectedFile);
      this.uploadFilesSimulator(0);
    }
  }


  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  download() {


  }


  async play() {

    let text = "";
    if (this.selectedFile.type === "application/pdf") {
      text = await this.txtHelper.readPdfFileToRawText(this.selectedFile);
    }
    else if (this.selectedFile.type === "text/plain") {
      text = await this.txtHelper.readTxtFileToRawText(this.selectedFile);
    }

    const dialogRef = this.dialog.open(TextAudioPlayerComponent, {
      data: { text: text }
    });

  }

  cancel() {
    this.files = [];
    this.isControlEnabled = false;
  }

}
