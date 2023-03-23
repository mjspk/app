import { Component, ViewChild, ElementRef } from "@angular/core";
import { AudioHelper } from "src/app/helpers/audioHelper";


@Component({
  selector: 'app-pdf-to-audio',
  templateUrl: './pdf-to-audio.component.html',
  styleUrls: ['./pdf-to-audio.component.css']
})
export class PdfToAudioComponent {
  constructor(private audioHelper: AudioHelper) { }
  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any[]) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(evt: any) {
    const files = evt.target.files;
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
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

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: any[]) {
    this.files = [];
    if (files.length > 0) {
      const file = files[0];
      file.progress = 0;
      this.files.push(file);
      this.uploadFilesSimulator(0);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
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

  selectedLanguage = { name: "English", code: "en-US" }
  selectedVoice = "MALE";
  isConverting: boolean = false;
  isControlEnabled: boolean = false;
  languages = [
    { name: "English", code: "en-US" },
    { name: "Spanish", code: "es-ES" },
    { name: "French", code: "fr-FR" },
    { name: "German", code: "de-DE" },
    { name: "Italian", code: "it-IT" },
    { name: "Japanese", code: "ja-JP" }
  ];
  voices = [
    "MALE",
    "FEMALE",
    "NEUTRAL"
  ];

  download() {
    this.isConverting = true;
    this.isControlEnabled = false;
    this.audioHelper.convertToAudio(this.files[0], this.selectedLanguage.code, this.selectedVoice).then((res) => {
      this.isConverting = false;
      this.isControlEnabled = true;
      console.log(res);
    });
  }

  isPlaying: boolean = false;
  progress: any;
  isFirstPlay: boolean = true;
  playPause() {
    if (this.isFirstPlay) {
      this.audioHelper.convertToSpeech(this.files[0], this.selectedLanguage.code, this.selectedVoice).then((res) => {
        this.isFirstPlay = false;
        this.isPlaying = true;
      });
    }
    else {
      if (this.audioHelper.isPaused()) {
        this.audioHelper.resume();
        this.isPlaying = true;
      }
      else {
        this.audioHelper.pause();
        this.isPlaying = false;
      }
    }


  }

  increaseSpeed() {
    this.audioHelper.increaseSpeechRate();
  }

  decreaseSpeed() {
    this.audioHelper.decreaseSpeechRate();
  }

  cancel() {
    this.audioHelper.cancel();
    this.isPlaying = false;
    this.isFirstPlay = true;
    this.isConverting = false;
    this.files = [];
    this.isControlEnabled = false;
  }
}
