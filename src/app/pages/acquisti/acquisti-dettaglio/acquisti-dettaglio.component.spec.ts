import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquistiDettaglioComponent } from './acquisti-dettaglio.component';

describe('AcquistiDettaglioComponent', () => {
  let component: AcquistiDettaglioComponent;
  let fixture: ComponentFixture<AcquistiDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcquistiDettaglioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquistiDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
