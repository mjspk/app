import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToAudioComponent } from './pdf-to-audio.component';

describe('PdfToAudioComponent', () => {
  let component: PdfToAudioComponent;
  let fixture: ComponentFixture<PdfToAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfToAudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfToAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
