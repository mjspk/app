import { Injectable } from "@angular/core";
import { GutendexService } from "../services/gutendex.service";
import { TxtHelper } from "./txtHelper";

@Injectable({
    providedIn: 'root'
})

export class AudioHelper {

    constructor(private gutendexService: GutendexService) { }

    downloadMp3(id: number, title: string, voice?: SpeechSynthesisVoice, pitch = 1, rate = 1, volume = 1) {
        


    }

    textToSpeech(id: number, voice?: SpeechSynthesisVoice, pitch = 1, rate = 1, volume = 1) {

        this.gutendexService.getBookText(id).then((txtContent: string) => {
            const utterance = new SpeechSynthesisUtterance(txtContent);
            utterance.pitch = pitch;
            utterance.rate = rate;
            utterance.volume = volume;
            speechSynthesis.speak(utterance);
        }).catch((error) => {
            console.error(error);
        });
    }

    static getVoices() {
        return speechSynthesis.getVoices();
    }

    static getVoiceByName(name: string) {
        return speechSynthesis.getVoices().find(voice => voice.name === name);
    }

    static getVoiceByLang(lang: string) {
        return speechSynthesis.getVoices().find(voice => voice.lang === lang);
    }

    static getVoiceByLangAndName(lang: string, name: string) {
        return speechSynthesis.getVoices().find(voice => voice.lang === lang && voice.name === name);
    }

    static pause() {
        speechSynthesis.pause();
    }

    static resume() {
        speechSynthesis.resume();
    }

    static cancel() {
        speechSynthesis.cancel();
    }

    static isSpeaking() {
        return speechSynthesis.speaking;
    }

    static isPaused() {
        return speechSynthesis.paused;
    }
}