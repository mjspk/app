import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookDetailsComponent } from './ebook-details.component';

describe('EbookDetailsComponent', () => {
  let component: EbookDetailsComponent;
  let fixture: ComponentFixture<EbookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbookDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
