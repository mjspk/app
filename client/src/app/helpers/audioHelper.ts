import { Injectable } from "@angular/core";
import { GutendexService } from "../services/gutendex.service";
import { Book } from "../models/book";

@Injectable({
    providedIn: 'root'
})

export class AudioHelper {


    getFileName() {
        return 'audio' + Date.now() + '.mp3';
    }


    constructor(private gutendexService: GutendexService) {

    }




    




    convertTxtToAudio(file: File, voice: string, speed: number, gender: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('convertTxtToSpeech');



        });
    }
    convertPdfToAudio(file: File, voice: string, speed: number, gender: string): Promise<void> {
        return new Promise((resolve, reject) => {

        });
    }




    download(filePath: any, fileName: string) {
        const blob = new Blob([filePath], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    }

   
    textToAudio(id: number, title: string) {


    }

   









}