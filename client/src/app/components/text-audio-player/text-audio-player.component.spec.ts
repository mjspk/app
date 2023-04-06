import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAudioPlayerComponent } from './text-audio-player.component';

describe('TextAudioPlayerComponent', () => {
  let component: TextAudioPlayerComponent;
  let fixture: ComponentFixture<TextAudioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAudioPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
