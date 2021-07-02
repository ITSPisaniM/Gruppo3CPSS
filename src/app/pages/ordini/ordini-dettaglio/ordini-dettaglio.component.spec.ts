import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdiniDettaglioComponent } from './ordini-dettaglio.component';

describe('OrdiniDettaglioComponent', () => {
  let component: OrdiniDettaglioComponent;
  let fixture: ComponentFixture<OrdiniDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdiniDettaglioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdiniDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
