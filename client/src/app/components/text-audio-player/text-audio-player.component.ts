import { Component, Inject } from '@angular/core';
import { RecommendedVoices } from 'src/app/models/recommendedVoices';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { GutendexService } from 'src/app/services/gutendex.service';
import { PdfHelper } from 'src/app/helpers/pdfHelper';
import { TxtHelper } from 'src/app/helpers/txtHelper';

@Component({
  selector: 'app-text-audio-player',
  templateUrl: './text-audio-player.component.html',
  styleUrls: ['./text-audio-player.component.css']
})
export class TextAudioPlayerComponent {
  public recommendedVoices: RecommendedVoices;
  public rates: number[];
  public selectedRate: number;
  public selectedVoice: SpeechSynthesisVoice | null;
  public text!: string;
  public voices: SpeechSynthesisVoice[];
  isLoading = false;
  isPlaying = false;
  utterance!: SpeechSynthesisUtterance;
  selectedBook!: Book;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { book: Book, text: string }, private txtHelper: TxtHelper) {

    this.voices = [];
    this.rates = [.25, .5, .75, 1, 1.25, 1.5, 1.75, 2];
    this.selectedVoice = null;
    this.selectedRate = 1;
    if (data.text) {
      this.text = data.text;

    }
    else {
      this.text = '';
      this.selectedBook = data.book;
      this.getbootText();
    }
    this.recommendedVoices = Object.create(null);
    this.recommendedVoices["Alex"] = true;
    this.recommendedVoices["Alva"] = true;
    this.recommendedVoices["Damayanti"] = true;
    this.recommendedVoices["Daniel"] = true;
    this.recommendedVoices["Fiona"] = true;
    this.recommendedVoices["Fred"] = true;
    this.recommendedVoices["Karen"] = true;
    this.recommendedVoices["Mei-Jia"] = true;
    this.recommendedVoices["Melina"] = true;
    this.recommendedVoices["Moira"] = true;
    this.recommendedVoices["Rishi"] = true;
    this.recommendedVoices["Samantha"] = true;
    this.recommendedVoices["Tessa"] = true;
    this.recommendedVoices["Veena"] = true;
    this.recommendedVoices["Victoria"] = true;
    this.recommendedVoices["Yuri"] = true;

  }

  async getbootText() {
    this.isLoading = true;
    const text = await this.txtHelper.getCleanBookText(this.selectedBook);
    this.text = text;
    this.isLoading = false;


  }




  public ngOnInit(): void {

    this.voices = speechSynthesis.getVoices();
    this.selectedVoice = (this.voices[0] || null);
    if (!this.voices.length) {

      speechSynthesis.addEventListener(
        "voiceschanged",
        () => {

          this.voices = speechSynthesis.getVoices();
          this.selectedVoice = (this.voices[0] || null);
          this.synthesizeSpeechFromText();

        }
      );

    }

  }



  public playPause(): void {
    if (this.isPlaying) {
      speechSynthesis.pause();
    }
    else {
      speechSynthesis.resume();
    }
    this.isPlaying = !this.isPlaying;
  }


  public cancel(): void {

    if (speechSynthesis.speaking) {

      speechSynthesis.cancel();

    }

  }




  private synthesizeSpeechFromText(): void {

    this.utterance = new SpeechSynthesisUtterance(this.text);
    this.utterance.voice = this.selectedVoice;
    this.utterance.rate = this.selectedRate;
    speechSynthesis.cancel();
    speechSynthesis.speak(this.utterance);
    this.isPlaying = true;
    this.utterance.onend = () => {
      this.isPlaying = false;
    }

  }


  changeVoice(voice: SpeechSynthesisVoice) {
    this.selectedVoice = voice;
    this.synthesizeSpeechFromText();
  }

  changeRate(rate: number) {
    this.selectedRate = rate;
    this.synthesizeSpeechFromText();
  }
}
