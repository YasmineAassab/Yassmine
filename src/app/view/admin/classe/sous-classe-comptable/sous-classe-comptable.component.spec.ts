import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousClasseComptableComponent } from './sous-classe-comptable.component';

describe('SousClasseComptableComponent', () => {
  let component: SousClasseComptableComponent;
  let fixture: ComponentFixture<SousClasseComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousClasseComptableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousClasseComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
