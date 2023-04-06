import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAudioDownloaderComponent } from './text-audio-downloader.component';

describe('TextAudioDownloaderComponent', () => {
  let component: TextAudioDownloaderComponent;
  let fixture: ComponentFixture<TextAudioDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAudioDownloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAudioDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
