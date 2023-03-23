import { Injectable } from "@angular/core";
import { GutendexService } from "../services/gutendex.service";

@Injectable({
    providedIn: 'root'
})

export class AudioHelper {
  
    progress = 0;
    progressCallback!: (progress: number) => void;

    convertToAudio(file: File, lang: string, gender: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                // const text = e.target.result;
                // this.gutendexService.postTextToSpeech(text, lang, 1.0, gender).then((audioContent: any) => {
                //     this.download(audioContent, file.name);
                //     resolve();
                // }
                // ).catch((error) => {
                //     console.error(error);
                // }
                // );
                resolve();


            }
            reader.readAsText(file);
        });
    }

    convertToSpeech(file: File, lang: string, gender: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const text = e.target.result;
                // this.gutendexService.postTextToSpeech(text, lang, 1.0, gender).then((audioContent: any) => {
                //     this.textToSpeech(audioContent, file.name);
                //     resolve();
                // }
                // ).catch((error) => {
                //     console.error(error);
                // }
                // );
                resolve();


            }
            reader.readAsText(file);
        });
    }
    utterance!: SpeechSynthesisUtterance
    constructor(private gutendexService: GutendexService) {

     }

    download(audioContent: any, title: string) {
        const blob = new Blob([audioContent], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = title + '.mp3';
        link.click();
    }
    downloadMp3(id: number, title: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.gutendexService.getTextToSpeech(id, "en-US", 1.0, "MALE").then((audioContent: any) => {
                this.download(audioContent, title);
                resolve();

            }).catch((error) => {
                console.error(error);
            });
        });
    }
removeNonTextAndKeepPunctuation(text: string) {
    return text.replace(/[^a-zA-Z0-9.,!?;:'"()\- ]/g, '');
}
// *** START OF THE PROJECT GUTENBERG EBOOK THE COMPLETE WORKS OF WILLIAM SHAKESPEARE ***

removeAllTextBeforeLineSartandEndWithThreeAsterisks(text: string,title: string) {
    var match = text.match(new RegExp(`\\*\\*\\* START OF THE PROJECT GUTENBERG EBOOK ${title.toUpperCase()} \\*\\*\\*`));
    if (match) {
        const index = match.index;
        var cleanContent = text.substring((index as number));
        return cleanContent.replace(`\\*\\*\\* START OF THE PROJECT GUTENBERG EBOOK ${title.toUpperCase()} \\*\\*\\*`, '');
    }
    return text;
}
 

    textToSpeech(id: number,title: string, voice?: SpeechSynthesisVoice, pitch = 1, rate = 1, volume = 1) {
  this.gutendexService.getBookText(id).then((txtContent: string) => {
    txtContent = this.removeAllTextBeforeLineSartandEndWithThreeAsterisks(txtContent,title);
    const cleanContent = this.removeNonTextAndKeepPunctuation(txtContent);
    
    const maxLength = 32767;
    const chunks: (string | undefined)[] = [];
    let i, j;
    for (i = 0, j = cleanContent.length; i < j; i += maxLength) {
      chunks.push(cleanContent.substr(i, maxLength));
    }
    const speakChunk = (chunkIndex: number) => {
      this.utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      this.utterance.pitch = pitch;
      this.utterance.rate = rate;
      this.utterance.volume = volume;
        if (voice) {
            this.utterance.voice = voice;
        }
      this.utterance.onend = () => {
        if (chunkIndex + 1 < chunks.length) {
          speakChunk(chunkIndex + 1);
        }
      };
      this.utterance.onmark = (event) => {
        this.progress = event.charIndex / cleanContent.length;
        this.progressCallback(this.progress);
    };
       
      speechSynthesis.speak(this.utterance);
    };
    speakChunk(0);
  }).catch((error) => {
    throw new Error(error);
  });
}


    public getVoices() {
        return speechSynthesis.getVoices();
    }

    public getVoiceByName(name: string) {
        return speechSynthesis.getVoices().find(voice => voice.name === name);
    }

    public getVoiceByLang(lang: string) {
        return speechSynthesis.getVoices().find(voice => voice.lang === lang);
    }

    public getVoiceByLangAndName(lang: string, name: string) {
        return speechSynthesis.getVoices().find(voice => voice.lang === lang && voice.name === name);
    }

    public pause() {
        speechSynthesis.pause();
    }

    public resume() {
        speechSynthesis.resume();
    }

    public cancel() {
        speechSynthesis.cancel();
    }

    public isSpeaking() {
        return speechSynthesis.speaking;
    }

    public isPaused() {
        return speechSynthesis.paused;
    }

    public isPending() {
        return speechSynthesis.pending;
    }

    public increaseSpeechRate() {
        this.utterance.rate += 0.1;
    }

    public decreaseSpeechRate() {
        this.utterance.rate -= 0.1;
    }

    public increaseSpeechPitch() {
        this.utterance.pitch += 0.1;
    }

    public decreaseSpeechPitch() {
        this.utterance.pitch -= 0.1;
    }

    public increaseSpeechVolume() {
        this.utterance.volume += 0.1;
    }

    public decreaseSpeechVolume() {

        this.utterance.volume -= 0.1;
    }



    

}