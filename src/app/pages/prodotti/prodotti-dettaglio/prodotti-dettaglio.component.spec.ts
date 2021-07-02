import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiDettaglioComponent } from './prodotti-dettaglio.component';

describe('DettaglioComponent', () => {
  let component: ProdottiDettaglioComponent;
  let fixture: ComponentFixture<ProdottiDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdottiDettaglioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdottiDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
