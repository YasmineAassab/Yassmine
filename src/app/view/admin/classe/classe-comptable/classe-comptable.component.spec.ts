import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseComptableComponent } from './classe-comptable.component';

describe('ClasseComptableComponent', () => {
  let component: ClasseComptableComponent;
  let fixture: ComponentFixture<ClasseComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseComptableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
