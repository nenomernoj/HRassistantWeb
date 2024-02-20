import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTarifComponent } from './modal-tarif.component';

describe('ModalTarifComponent', () => {
  let component: ModalTarifComponent;
  let fixture: ComponentFixture<ModalTarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalTarifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
